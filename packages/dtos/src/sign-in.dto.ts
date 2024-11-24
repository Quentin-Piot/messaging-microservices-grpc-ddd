import { IsEmail, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";
import type { EmailPhoneNumberPassword, UserResponse } from "@quentinpiot/protos/generated/user";

export class EmailPhoneNumberPasswordDto implements EmailPhoneNumberPassword {

  @IsOptional()
  @IsEmail()
  @ValidateIf(req=>req.email || !req.phoneNumber )
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @ValidateIf(req=>!req.email || req.phoneNumber )
  phoneNumber: string;
}
