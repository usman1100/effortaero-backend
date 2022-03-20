import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from '../members/members.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import {
    Organization,
    OrganizationSchema,
} from './schemas/organization.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Organization.name, schema: OrganizationSchema },
        ]),
        MemberModule,
    ],
    exports: [OrganizationService, OrganizationModule],
    providers: [OrganizationService],
    controllers: [OrganizationController],
})
export class OrganizationModule {}
