import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule],
    exports: [AuthService],
    providers: [AuthService, UserModule],
    controllers: [AuthController],
})
export class AuthModule {}
