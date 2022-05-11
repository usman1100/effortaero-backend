import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { MemberModule } from './modules/members/members.module';
import { EstimationModule } from './modules/estimation/estimation.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/effortaero'),

        UserModule,

        AuthModule,

        ProjectModule,

        OrganizationModule,

        MemberModule,

        EstimationModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
