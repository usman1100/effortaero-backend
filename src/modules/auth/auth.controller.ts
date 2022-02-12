import { Controller, Get, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @Post("login")
    async login(@Res() res:Response){
        const data = await this.authService.login();

        if (data.failed) return res.status(data.code).json(data);

        return res.json(data);
    }

}
