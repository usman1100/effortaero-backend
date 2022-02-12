import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDTO } from '../user/schemas/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginCred:LoginDTO, @Res() res: Response) {
        const data = await this.authService.login(loginCred.email, loginCred.password);
        if (data.failed) return res.status(data.code).json(data);
        return res.json(data);
    }

    @Post('signup')
    async signUp(@Body() userInfo: UserDTO, @Res() res: Response) {
        const data = await this.authService.signUp(userInfo);
        if (data.failed) return res.status(data.code).json(data);
        return res.json(data);
    }
}
