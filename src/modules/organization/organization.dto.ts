import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOrganizationDTO {
    @IsString()
    name: string;

    @IsString()
    createdBy: string;
}

export class AddMemberDTO {
    @MinLength(24)
    @MaxLength(24)
    userID: string;

    @MinLength(24)
    @MaxLength(24)
    orgID: string;
}
