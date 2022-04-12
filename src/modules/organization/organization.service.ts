import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import {
    generateAlreadyExistError,
    generateInternalServerError,
    generateNotFoundError,
    generateSuccessResponse,
    generateUnprocessableEntityError,
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
            const promises = [];
            orgs.forEach((org: any) => {
                promises.push(this.memberService.getByOrg(org._id));
            });
            const resolved = await Promise.all(promises);

            const data = resolved.map((e, i) => {
                return {
                    org: orgs[i],
                    members: e.data,
                };
            });

            return generateSuccessResponse(data);
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

    async addMember(orgID: string, userID: string) {
        try {
            if (!isValidObjectId(orgID) || !isValidObjectId(userID)) {
                return generateUnprocessableEntityError('Invalid ID provided');
            }

            const org = await this.findOne({ _id: orgID });
            if (!org) {
                return generateNotFoundError('Organization not found');
            }

            const member = await this.memberService.addMember(orgID, userID);

            return generateSuccessResponse(member.data, HttpStatus.CREATED);
        } catch (e) {
            return generateInternalServerError(e);
        }
    }
}
