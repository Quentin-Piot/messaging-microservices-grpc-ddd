import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import type { CreateUserRequest, UserResponse } from "@quentinpiot/protos/generated/user";

export class CreateUserDto implements CreateUserRequest {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  phoneNumber: string;
}


export class CreateUserResponse implements Partial<UserResponse> {
  createdAt: string;
  email: string;
  phoneNumber: string;
  updatedAt: string;
}