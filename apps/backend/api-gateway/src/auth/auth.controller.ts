import { Controller, Inject, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientGrpc } from "@nestjs/microservices";

import {
  UserResponse,
  UserServiceController,
} from "@quentinpiot/protos/generated/user";
interface UserService extends UserServiceController {}

@Controller("auth")
export class AuthController {
  private userService: UserService;

  constructor(
    @Inject("USER_PACKAGE") private client: ClientGrpc,

    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    try {
      this.userService = this.client.getService<UserService>("UserService");
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async signIn(
    password: string,
    email?: string,
    phoneNumber?: string,
  ): Promise<{ access_token: string }> {
    const user = (await this.userService.checkPasswordCombination({
      password,
      email,
      phoneNumber,
    })) as UserResponse;
    const payload = { sub: user.id, username: email || password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
