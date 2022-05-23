import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateDelphiRoundDTO {
    @IsString()
    @Length(24)
    projectID: string;
}

export class AddContributionDTO {
    @IsNumber()
    value: number;

    @IsOptional()
    @IsString()
    message: string;
}
