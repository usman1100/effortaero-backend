import {
    IsNumber,
    isNumber,
    IsNumberString,
    IsString,
    Length,
} from 'class-validator';

export class CreateDelphiRoundDTO {
    @IsString()
    @Length(24)
    projectID: string;
}

export class AddContributionDTO {
    userID: string;

    @IsNumber()
    value: number;

    @IsString()
    @Length(24)
    roundID: string;
}
