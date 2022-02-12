import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './schemas/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async getAll() {
        return await this.userModel.find();
    }

    async create(data: UserDTO) {
        try {
            const newUser = await this.userModel.create(data);

            return {
                failed: false,
                message: '',
                data: newUser,
            };
        } catch (e: any) {
            const error: Error = e;

            if (error?.message.includes('dup key')) {
                return {
                    failed: true,
                    message: 'Email already exists',
                    data: null,
                };
            }

            return {
                failed: true,
                message: 'Something went wrong',
                data: null,
            };
        }
    }
}
