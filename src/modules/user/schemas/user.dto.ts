import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UserDTO {
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    name: string;

    @IsEmail()
    @MaxLength(40)
    email: string;

    // 10 characters at least, at most 20 characters, at least one uppercase letter, one lowercase letter and one number:
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,20}$/, {
        message:
            'Password must contain 10 characters at least, at most 20 characters, at least one uppercase letter, one lowercase letter and one number',
    })
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;
}
