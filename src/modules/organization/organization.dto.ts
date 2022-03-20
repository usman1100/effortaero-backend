import { IsString } from 'class-validator';

export class CreateOrganizationDTO {
    @IsString()
    name: string;

    @IsString()
    createdBy: string;
}
