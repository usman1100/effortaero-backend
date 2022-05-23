import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
    Param,
    Req,
} from '@nestjs/common';
import { Response } from 'express';
import { generateSuccessResponse } from 'src/utils';
import {
    ChangePasswordDTO,
    SocialDTO,
    UserDTO,
} from '../user/schemas/user.dto';
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

    @Post('social-login')
    async socialLogin(@Body() loginCred: SocialDTO, @Res() res: Response) {
        const data = await this.authService.socialLogin(loginCred);
        return res.status(data.code).json(data);
    }

    @Post('register')
    async signUp(@Body() userInfo: UserDTO, @Res() res: Response) {
        const data = await this.authService.signUp(userInfo);
        return res.status(data.code).json(data);
    }

    @Post('forget-password')
    async forgotPassword(@Res() res, @Body() body) {
        const data = await this.authService.forgotPassword(body);
        return res.status(data.code).json(data);
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @Body() body: ChangePasswordDTO,
        @Res() res: Response,
        @Req() req,
    ) {
        const userID = req?.user?.id;

        const data = await this.authService.changePassword(userID, body);
        return res.status(data.code).json(data);
    }

    @Get('verify/:id')
    async verify(@Res() res, @Param('id') id: string) {
        const data = await this.authService.verify(id);
        if (data.failed) {
            return res.status(data.code).json(data);
        } else return res.redirect(`${process.env.FRONTEND_URL}/`);
    }
}
