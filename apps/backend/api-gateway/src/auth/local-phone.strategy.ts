import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";

import { AuthService } from "./auth.service";

@Injectable()
export class LocalPhoneStrategy extends PassportStrategy(
  Strategy,
  "local-phone",
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "phoneNumber",
      passwordField: "password",
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      password,
      phoneNumber,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
