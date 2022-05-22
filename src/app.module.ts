import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { MemberModule } from './modules/members/members.module';
import { EstimationModule } from './modules/estimation/estimation.module';
import { MailerModule } from '@nestjs-modules/mailer';
import 'dotenv/config';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI),

        UserModule,

        AuthModule,

        ProjectModule,

        OrganizationModule,

        MemberModule,

        EstimationModule,

        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_SMTP,
                port: Number(process.env.MAIL_PORT),
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            defaults: {
                from: process.env.MAIL_FROM, // sender address
            },
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
