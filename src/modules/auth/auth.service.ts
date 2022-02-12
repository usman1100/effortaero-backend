import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { UserDTO } from '../user/schemas/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(email: string, password: string) {
        const {data} = await this.userService.findByEmail(email);

        if (!data) return ({
            failed:true,
            code: HttpStatus.NOT_FOUND,
            message: "No user found with this email",
            data: null
        })


        if (data.password === password) return ({
            failed:false,
            code: HttpStatus.OK,
            message: "",
            data
        })


        return ({
            failed:true,
            code: HttpStatus.UNAUTHORIZED,
            message: "Wrong password",
            data: null
        })
    }

    async signUp(userInfo: UserDTO) {
        const data = await this.userService.create(userInfo);
        return data;
    }
}
