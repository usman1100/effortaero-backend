import {
    Body,
    Controller,
    Get,
    Put,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesAllowed } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.type';
import { SearchUsersDTO, UpdateUserDTO } from './schemas/user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @RolesAllowed(Role.OWNER)
    async search(@Res() res, @Query() query: SearchUsersDTO) {
        const response = await this.userService.search(query);
        return res.status(response.code).json(response);
    }

    @Get('me')
    async myInfo(@Res() res, @Req() req) {
        const userID = req?.user?.id;
        const response = await this.userService.myInfo(userID);
        return res.status(response.code).json(response);
    }

    @Put('me')
    async updateMyInfo(@Res() res, @Req() req, @Body() body: UpdateUserDTO) {
        const userID = req?.user?.id;
        const response = await this.userService.updateMyInfo(userID, body);
        return res.status(response.code).json(response);
    }
}
