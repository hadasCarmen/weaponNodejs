import { IsString, IsInt, isString, IsNumber, IsEmail } from 'class-validator';

export class DtoUser {
  @IsString()
  username: string;

  @IsString()
  role: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
