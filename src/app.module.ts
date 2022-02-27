import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/effortaero'),

        UserModule,

        AuthModule,

        ProjectModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
