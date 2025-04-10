import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SigninDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}