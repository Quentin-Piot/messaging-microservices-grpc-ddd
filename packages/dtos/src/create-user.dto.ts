import { IsEmail, IsString, MinLength } from "class-validator";
import {
  CreateUserRequest,
} from "@quentinpiot/protos/generated/user";

export class CreateUserDto implements CreateUserRequest{

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  phoneNumber: string;
}
