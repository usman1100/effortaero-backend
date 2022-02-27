import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
        ]),
    ],
    exports: [ProjectService, ProjectModule],
    providers: [ProjectService],
    controllers: [ProjectController],
})
export class ProjectModule {}
