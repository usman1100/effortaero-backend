import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
        ]),
        OrganizationModule,
    ],
    exports: [ProjectService, ProjectModule],
    providers: [ProjectService],
    controllers: [ProjectController],
})
export class ProjectModule {}
