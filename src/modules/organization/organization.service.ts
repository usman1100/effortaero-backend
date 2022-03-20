import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    generateAlreadyExistError,
    generateInternalServerError,
    generateSuccessResponse,
} from 'src/utils';
import { BaseService } from '../base/base.service';
import {
    Organization,
    OrganizationDocument,
} from './schemas/organization.schema';
import { CreateOrganizationDTO } from './organization.dto';
import { MemberService } from '../members/members.service';
import { CreateMemberDTO } from '../members/members.dto';

@Injectable()
export class OrganizationService extends BaseService<OrganizationDocument> {
    constructor(
        @InjectModel(Organization.name)
        private readonly orgModel: Model<OrganizationDocument>,
        private readonly memberService: MemberService,
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

    async addMember(memberInfo: CreateMemberDTO) {
        try {
            const response = await this.memberService.createNew(memberInfo);

            if (response.failed) return response;

            return generateSuccessResponse(
                response.data,
                HttpStatus.CREATED,
                '',
            );
        } catch (e) {
            return generateInternalServerError(e);
        }
    }
}
