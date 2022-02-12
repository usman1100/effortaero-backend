import { Injectable, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login() {
        const data = await this.userService.findByID(
            '62078bdfba423a6e33550fe1',
        );
        return data;
    }
}
