import { IsEnum, Length } from 'class-validator';
import { MemberRoles } from './members.types';

export class CreateMemberDTO {
    @Length(24, 24, {
        message: 'orgID must be a valid MongoDB ObjectID',
    })
    orgID: string;

    @Length(24, 24, {
        message: 'userID must be a valid MongoDB ObjectID',
    })
    userID: string;

    @IsEnum(MemberRoles, {
        message: 'Role can either be manager or developer',
    })
    role: MemberRoles;
}
