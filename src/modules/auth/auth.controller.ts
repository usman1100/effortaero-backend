import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from '../user/schemas/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginCred: LoginDTO, @Res() res: Response) {
        const data = await this.authService.login(
            loginCred.email,
            loginCred.password,
        );
        return res.status(data.code).json(data);
    }

    @Post('register')
    async signUp(@Body() userInfo: UserDTO, @Res() res: Response) {
        const data = await this.authService.signUp(userInfo);
        return res.status(data.code).json(data);
    }
}
