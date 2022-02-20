import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/schemas/user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        const { data } = await this.userService.findByEmail(email);

        if (!data)
            return {
                failed: true,
                code: HttpStatus.NOT_FOUND,
                message: 'No user found with this email',
                data: null,
            };

        if (compareSync(data.password, password)) {
            return {
                failed: true,
                code: HttpStatus.UNAUTHORIZED,
                message: 'Wrong password',
                data: null,
            };
        }

        const payload = {
            id: data.id,
            email: data.email,
            role: data.role,
        };

        const token = this.jwtService.sign(payload);

        return {
            failed: false,
            code: HttpStatus.OK,
            message: '',
            data,
            token,
        };
    }

    async signUp(userInfo: UserDTO) {
        const hashedPassword = await hash(userInfo.password, 10);

        const data = await this.userService.create({
            ...userInfo,
            password: hashedPassword,
        });
        return data;
    }
}
