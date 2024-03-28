import { IsOptional, IsEmail, IsNotEmpty, Matches, ValidateIf } from "class-validator"
import { Match } from "decorators/match.decorator"

export class UpdateUserDto {
    @IsOptional()
    first_name?: string

    @IsOptional()
    last_name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    role_id?: string

    @IsOptional()
    avatar?: string

    @ValidateIf((o) => typeof o.password === 'string' && o.password.lenght > 0)
    @IsOptional()
    @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
        message: 'Password must have al least one number, lower or upper case letter and it has to be longer than 5 characters.'
    })
    password?: string

    @ValidateIf((o) => typeof o.confirm_password === 'string' && o.confirm_password.lenght > 0)
    @IsOptional()
    @Match(UpdateUserDto, (field) => field.password, { message: 'Passwords do not match.' })
    confirm_password?: string
}