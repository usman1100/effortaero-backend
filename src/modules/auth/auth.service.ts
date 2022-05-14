import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SocialDTO, UserDTO } from '../user/schemas/user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compareSync, hashSync } from 'bcrypt';
import {
    generateInternalServerError,
    generateResponse,
    generateSuccessResponse,
} from 'src/utils';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
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

            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            };

            const token = this.jwtService.sign(payload);

            return generateResponse(false, HttpStatus.CREATED, '', {
                token,
                user: user,
            });
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
}
