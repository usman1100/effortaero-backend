import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConstants from 'src/constants/jwtConstants';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '2h',
            },
        }),
    ],
    exports: [AuthService],
    providers: [AuthService, UserModule, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
