import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { UserDTO } from './schemas/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async getAll() {
        try {
            const users = await this.userModel.find();

            if (users.length === 0) {
                return {
                    failed: true,
                    code: HttpStatus.NOT_FOUND,
                    message: 'Users were not found',
                    data: users,
                };
            }

            return {
                failed: false,
                code: HttpStatus.OK,
                message: '',
                data: users,
            };
        } catch (error) {
            return {
                failed: true,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong',
                data: null,
            };
        }
    }

    async create(data: UserDTO) {
        try {
            const newUser = await this.userModel.create(data);

            return {
                failed: false,
                code: HttpStatus.CREATED,
                message: '',
                data: newUser,
            };
        } catch (e: any) {
            const error: Error = e;

            if (error?.message.includes('dup key')) {
                return {
                    failed: true,
                    code: HttpStatus.CONFLICT,
                    message: 'Email already exists',
                    data: null,
                };
            }

            return {
                failed: true,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong',
                data: null,
            };
        }
    }

    async findByID(id: string) {
        if (!isValidObjectId(id)) {
            return {
                failed: true,
                code: HttpStatus.UNPROCESSABLE_ENTITY,
                message: 'ID is not valid',
                data: null,
            };
        }

        const user = await this.userModel.findById(id);
        if (!user) {
            return {
                failed: true,
                code: HttpStatus.NOT_FOUND,
                message: 'User was not found',
                data: user,
            };
        }

        return {
            failed: false,
            code: HttpStatus.OK,
            message: '',
            data: user,
        };
    }

    async findByEmail(email: string) {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return {
                failed: true,
                code: HttpStatus.NOT_FOUND,
                message: 'User was not found',
                data: user,
            };
        }

        return {
            failed: false,
            code: HttpStatus.OK,
            message: '',
            data: user,
        };
    }
}
