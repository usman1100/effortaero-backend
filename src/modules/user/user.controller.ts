import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll(@Res() res: Response) {
    return res.json(await this.userService.getAll());
  }

  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    const response = await this.userService.create(req.body);
    return res.json(response);
  }
}
