import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<ProjectDocument>,
    ) {}

    async create(projectInfo: any) {
        const newProject = await this.projectModel.create(projectInfo);

        return {
            message: 'Project created',
            data: newProject,
            code: HttpStatus.OK,
        };
    }
}
