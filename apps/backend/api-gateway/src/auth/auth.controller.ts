import { Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";

import { Request } from "express";

import {
  EmailPhoneNumberPasswordDto,
  SignInResponseDto,
} from "@quentinpiot/dtos";
import {
  UserResponse,
  UserServiceController,
} from "@quentinpiot/protos/generated/user";

import { AuthService } from "@/auth/auth.service";
import { LocalEmailAuthGuard } from "@/auth/local-email-auth.guard";
interface UserService extends UserServiceController {}

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("USER_PACKAGE") private client: ClientGrpc,

    private service: AuthService,
  ) {}

  @Post()
  @UseGuards(LocalEmailAuthGuard)
  async login(@Req() req: Request): Promise<SignInResponseDto> {
    return this.service.login(req.user);
  }
}
