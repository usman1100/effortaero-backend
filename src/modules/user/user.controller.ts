import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDTO } from './schemas/user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    async getAll(@Req() req: any, @Res() res: Response) {
        const response = await this.userService.getAll();
        return res.status(response.code).json(response);
    }

    @Post('create')
    async create(@Body() req: UserDTO, @Res() res: Response) {
        const response = await this.userService.create(req);

        return res.status(response.code).json(response);
    }
}
