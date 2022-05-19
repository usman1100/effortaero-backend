import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Role } from 'src/modules/auth/roles/role.type';

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

    @IsEnum([Role.OWNER, Role.USER, Role.OWNER], {
        message: "Role must be one of the following: 'OWNER', 'USER',",
    })
    role: Role;
}

export class SocialDTO {
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @IsOptional()
    name: string;

    @IsEmail()
    @MaxLength(40)
    email: string;

    @IsString()
    authProvider: string;
}

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    name: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(40)
    email: string;
}

export class SearchUsersDTO {
    @IsOptional()
    @MaxLength(40)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    name: string;
}

export class ChangePasswordDTO {
    @IsString()
    @MinLength(8)
    oldPassword: string;

    @IsString()
    @MinLength(8)
    newPassword: string;
}
