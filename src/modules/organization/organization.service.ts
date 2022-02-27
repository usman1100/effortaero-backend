import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
