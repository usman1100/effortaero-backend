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
import { caluclateECF, caluclateTCF } from '../estimation/estimation.weights';
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

            const ecf = caluclateECF(projectInfo.environmentalFactors);
            const tcf = caluclateTCF(projectInfo.technicalFactors);

            const newProject = await this.projectModel.create({
                ...projectInfo,
                organization: projectInfo.orgID,
                createdBy: userID,
                ecf,
                tcf,
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
            const project = await this.projectModel
                .findById(id)
                .populate('organization');

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
            id;

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

    async updateOne(id: string, projectInfo: any) {
        try {
            const project = await this.projectModel.findById(id);

            if (!project) {
                return generateNotFoundError('Project not found');
            }

            const updatedProject = await this.projectModel.findByIdAndUpdate(
                id,
                {
                    ...projectInfo,
                },
                { new: true },
            );

            return generateSuccessResponse(updatedProject);
        } catch (error: any) {
            return generateInternalServerError(error);
        }
    }

    async getByOrg(orgID: string) {
        try {
            const projects = await this.projectModel.find({
                organization: orgID,
            });

            return generateSuccessResponse(projects);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }
}
