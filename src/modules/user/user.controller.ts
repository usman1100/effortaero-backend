import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesAllowed } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.type';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('search')
    @RolesAllowed(Role.OWNER)
    async getAll(@Res() res: Response) {
        const response = await this.userService.getAll();
        return res.status(response.code).json(response);
    }

    @Get('me')
    async myInfo(@Res() res, @Req() req) {
        const userID = req?.user?.id;
        const response = await this.userService.myInfo(userID);
        return res.status(response.code).json(response);
    }
}
