import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateResponse } from 'src/utils';
import {
    Organization,
    OrganizationDocument,
} from './schemas/organization.schema';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectModel(Organization.name)
        private readonly orgModel: Model<OrganizationDocument>,
    ) {}
    async create(body: any) {
        const newOrg = await this.orgModel.create({
            createdBy: body?.id,
            name: body?.name,
        });
        return generateResponse(false, HttpStatus.CREATED, '', newOrg);
    }
}
