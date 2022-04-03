import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { generateSuccessResponse } from 'src/utils';
import { UserDTO } from '../user/schemas/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('')
    @UseGuards(JwtAuthGuard)
    async validate(@Res() res) {
        return res.status(200).json(generateSuccessResponse(null));
    }

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
