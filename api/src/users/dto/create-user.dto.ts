import { IsEmail, IsNotEmpty, isString, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  passwordHash: string


  @IsEmail()
  @IsNotEmpty()
  email: string
}