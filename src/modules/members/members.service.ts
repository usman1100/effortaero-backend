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
import { CreateMemberDTO } from './members.dto';
import { Member } from './members.schema';

@Injectable()
export class MemberService extends BaseService<Member> {
    constructor(
        @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    ) {
        super(memberModel);
    }

    async createNew(memberInfo: CreateMemberDTO) {
        try {
            const exists = await this.memberModel.findOne({
                orgID: memberInfo.orgID,
                userID: memberInfo.userID,
            });
            if (exists) {
                return generateAlreadyExistError('User is already a member');
            }

            const newMember = await this.memberModel.create(memberInfo);

            return generateSuccessResponse(newMember, HttpStatus.CREATED);
        } catch (e) {
            return generateInternalServerError(e);
        }
    }

    async getUserOrganizations(userID: string) {
        try {
            const members = await this.memberModel.find({ userID });

            if (!members) {
                return generateNotFoundError('Organization not found');
            }

            return generateSuccessResponse(members);
        } catch (e) {
            return generateInternalServerError(e);
        }
    }
}
