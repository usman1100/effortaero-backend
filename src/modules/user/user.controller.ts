import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserDTO } from './schemas/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    async getAll(@Res() res: Response) {
        return res.json(await this.userService.getAll());
    }

    @Post('create')
    async create(@Body() req: UserDTO, @Res() res: Response) {
        const response = await this.userService.create(req);

        if (response.failed) return res.status(response.code).json(response)

        return res.json(response);
    }
}
