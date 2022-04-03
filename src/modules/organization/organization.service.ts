import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    generateAlreadyExistError,
    generateInternalServerError,
    generateSuccessResponse,
} from 'src/utils';
import { BaseService } from '../base/base.service';
import { MemberService } from '../members/members.service';
import { RequestService } from '../requests/requests.service';
import { CreateOrganizationDTO } from './organization.dto';
import {
    Organization,
    OrganizationDocument,
} from './schemas/organization.schema';

@Injectable()
export class OrganizationService extends BaseService<OrganizationDocument> {
    constructor(
        @InjectModel(Organization.name)
        private readonly orgModel: Model<OrganizationDocument>,
        private readonly memberService: MemberService,
        private readonly requestService: RequestService,
    ) {
        super(orgModel);
    }

    async createNew(orgInfo: CreateOrganizationDTO) {
        try {
            const orgExists = await this.findOne({ name: orgInfo.name });

            if (orgExists) {
                return generateAlreadyExistError('Organization already exists');
            }

            const newOrg = await this.create(orgInfo);

            return generateSuccessResponse(newOrg, HttpStatus.CREATED, '');
        } catch (e) {
            return generateAlreadyExistError(e);
        }
    }

    async getCreatedOrganizations(userID: string) {
        try {
            const orgs = await this.find({ createdBy: userID });
            return generateSuccessResponse(orgs);
        } catch (e) {
            return generateInternalServerError(e);
        }
    }

    async myOrganization(userID: string) {
        try {
            const orgs = this.memberService.getUserOrganizations(userID);
            return orgs;
        } catch (e) {
            return generateInternalServerError(e);
        }
    }
}
