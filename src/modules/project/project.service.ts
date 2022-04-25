import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    generateAlreadyExistError,
    generateInternalServerError,
    generateNotFoundError,
    generateSuccessResponse,
} from 'src/utils';
import { BaseService } from '../base/base.service';
import { OrganizationService } from '../organization/organization.service';
import { CreateProjectDTO } from './schemas/project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService extends BaseService<ProjectDocument> {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<ProjectDocument>,
        private readonly organizationService: OrganizationService,
    ) {
        super(projectModel);
    }

    async createNew(projectInfo: CreateProjectDTO, userID: string) {
        try {
            const organization = await this.organizationService.findById(
                projectInfo.orgID,
            );

            if (!organization) {
                return generateNotFoundError('Organization not found');
            }

            const exists = await this.projectModel.findOne({
                name: projectInfo.name,
                organization: projectInfo.orgID,
            });

            if (exists) {
                return generateAlreadyExistError(
                    'Project with this name already exists',
                );
            }

            const newProject = await this.projectModel.create({
                ...projectInfo,
                organization: projectInfo.orgID,
                createdBy: userID,
            });

            return generateSuccessResponse(newProject, HttpStatus.CREATED);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async getAll(id: string) {
        try {
            const projects = await this.projectModel
                .find({ createdBy: id })
                .populate('organization');

            return generateSuccessResponse(projects);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async getOne(id: string) {
        try {
            const project = await this.projectModel.findById(id);

            if (!project) {
                return generateNotFoundError('Project not found');
            }

            return generateSuccessResponse(project);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }

    async deleteOne(id: string) {
        try {
            console.log(id);

            const project = await this.projectModel.findById(id);

            if (!project) {
                return generateNotFoundError('Project not found');
            }

            await this.projectModel.findByIdAndDelete(id);

            return generateSuccessResponse(project);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }
}
