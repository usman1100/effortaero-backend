import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
    ChangePasswordDTO,
    ForgetPasswordDTO,
    SocialDTO,
    UserDTO,
} from '../user/schemas/user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compareSync, hashSync } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import {
    generateInternalServerError,
    generateNotFoundError,
    generateResponse,
    generateSuccessResponse,
} from 'src/utils';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        try {
            const { data: user } = await this.userService.findByEmail(email);

            if (!user)
                return {
                    failed: true,
                    code: HttpStatus.NOT_FOUND,
                    message: 'No user found with this email',
                    user: null,
                };

            if (!user.isVerified) {
                await this.mailerService.sendMail({
                    to: user.email,
                    from: process.env.MAIL_FROM,
                    subject: 'Email verification',
                    html: `
                    <h1>
                        <a href="http://${process.env.BACKEND_URL}/auth/verify/${user._id}">Click here</a>
                        <p>to verify your account</p>
                    </h1>
                    `,
                });

                return generateResponse(
                    true,
                    HttpStatus.UNAUTHORIZED,
                    'Please verify your email first',
                    null,
                );
            }

            const passwordMatched = compareSync(password, user.password);

            if (!passwordMatched) {
                return {
                    failed: true,
                    code: HttpStatus.UNAUTHORIZED,
                    message: 'Wrong password',
                    user: null,
                };
            }

            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            };

            const token = this.jwtService.sign(payload);

            return generateResponse(false, HttpStatus.OK, '', {
                token,
                user: user,
            });
        } catch (e) {
            return generateInternalServerError(e);
        }
    }

    async signUp(userInfo: UserDTO) {
        try {
            const { data: exists } = await this.userService.findByEmail(
                userInfo.email,
            );

            if (exists) {
                return generateResponse(
                    true,
                    HttpStatus.CONFLICT,
                    'Email already exists',
                    null,
                );
            }

            const hashedPassword = await hash(userInfo.password, 10);

            const user: any = await this.userService.create({
                ...userInfo,
                password: hashedPassword,
            });

            await this.mailerService.sendMail({
                to: user.email,
                from: process.env.MAIL_FROM,
                subject: 'Email verification',
                html: `
                <h1>
                    <a href="http://${process.env.BACKEND_URL}/auth/verify/${user._id}">Click here</a>
                    <p>to verify your account</p>
                </h1>
                `,
            });

            return generateSuccessResponse(null, HttpStatus.CREATED);
        } catch (e) {
            return generateInternalServerError(e);
        }
    }

    async socialLogin(info: SocialDTO) {
        try {
            const user: any = await this.userService.findOne({
                email: info.email,
            });

            if (user) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };

                const token = this.jwtService.sign(payload);

                return generateResponse(false, HttpStatus.OK, '', {
                    token,
                    user: user,
                });
            }

            const newUser: any = await this.userService.create({
                ...info,
                role: 'user',
                password: hashSync(uuid(), 10),
                isVerified: true,
            });

            const payload = {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            };

            const token = this.jwtService.sign(payload);

            newUser.password = undefined;

            return generateSuccessResponse(
                {
                    token,
                    user: newUser,
                },
                HttpStatus.CREATED,
            );
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async changePassword(id: string, info: ChangePasswordDTO) {
        try {
            const user = await this.userService.findOne({
                _id: id,
            });

            if (!user) {
                return generateResponse(
                    true,
                    HttpStatus.NOT_FOUND,
                    'No user found with this id',
                    null,
                );
            }

            const passwordMatched = compareSync(
                info.oldPassword,
                user.password,
            );

            if (!passwordMatched) {
                return generateResponse(
                    true,
                    HttpStatus.UNAUTHORIZED,
                    'Wrong password',
                    null,
                );
            }

            // check if old password and user password are same

            const samePassword = compareSync(info.newPassword, user.password);

            if (samePassword) {
                return generateResponse(
                    true,
                    HttpStatus.BAD_REQUEST,
                    'Old password and new password cannot be same',
                    null,
                );
            }

            const hashedPassword = await hash(info.newPassword, 10);

            const updatedUser = await this.userService.update(id, {
                password: hashedPassword,
            });

            return generateSuccessResponse(updatedUser);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async verify(id: string) {
        try {
            const user = await this.userService.update(id, {
                isVerified: true,
            });
            return generateSuccessResponse(user);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async forgotPassword(body: ForgetPasswordDTO) {
        try {
            const email = body.email;
            const { data: user } = await this.userService.findByEmail(email);

            if (!user) {
                return generateNotFoundError('No user found with this email');
            }

            if (!user.isVerified) {
                return generateResponse(
                    true,
                    HttpStatus.UNAUTHORIZED,
                    'Please verify your email first',
                    null,
                );
            }

            const newPassword = uuid();

            const hashedPassword = await hash(newPassword, 10);

            const updatedUser = await this.userService.update(
                user._id.toString(),
                {
                    password: hashedPassword,
                },
            );

            await this.mailerService.sendMail({
                to: email,
                from: process.env.MAIL_FROM,
                subject: 'Password reset',
                html: `
                <h1>
                    <p>Your new password is ${newPassword}</p>
                </h1>
                `,
            });

            return generateSuccessResponse(updatedUser);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }
}
