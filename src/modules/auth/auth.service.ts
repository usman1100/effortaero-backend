import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/schemas/user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { generateInternalServerError, generateResponse } from 'src/utils';

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

            if (await compare(user.password, password)) {
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

            const user = await this.userService.create({
                ...userInfo,
                password: hashedPassword,
            });
            return generateResponse(false, HttpStatus.CREATED, '', user);
        } catch (e) {
            return generateInternalServerError(e);
        }
    }
}
