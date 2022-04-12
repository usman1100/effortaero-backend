import { IsString, Length } from 'class-validator';

export class CreateProjectDTO {
    @IsString({
        message: 'Project name not provided',
    })
    @Length(2, 30, {
        message: 'Project name must be between 2 and 30 characters',
    })
    name: string;

    @IsString({
        message: 'Organization ID not provided',
    })
    @Length(24, 24, {
        message: 'Organization ID must be a valid MongoDB ObjectID',
    })
    orgID: string;
}

export class GetOneProjectDTO {
    @IsString({
        message: 'Project ID not provided',
    })
    @Length(24, 24, {
        message: 'Project ID must be a valid MongoDB ObjectID',
    })
    id: string;
}
