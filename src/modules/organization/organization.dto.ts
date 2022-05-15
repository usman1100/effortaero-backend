import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOrganizationDTO {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    slogan: string;

    @IsString()
    createdBy: string;
}

export class AddMemberDTO {
    @MinLength(24)
    @MaxLength(24)
    userID: string;
}
