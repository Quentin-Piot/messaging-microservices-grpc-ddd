import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientGrpc } from "@nestjs/microservices";

import { firstValueFrom, Observable } from "rxjs";

import {
  EmailPhoneNumberPasswordDto,
  SignInResponseDto,
} from "@quentinpiot/dtos";
import {
  UserResponse,
  UserServiceController,
} from "@quentinpiot/protos/generated/user";

interface UserService extends UserServiceController {}

@Injectable()
export class AuthService {
  private userService: UserService;

  constructor(
    private jwtService: JwtService,
    @Inject("USER_PACKAGE") private client: ClientGrpc,
  ) {}

  onModuleInit() {
    try {
      this.userService = this.client.getService<UserService>("UserService");
    } catch (error) {
      console.log(error);
    }
  }

  async validateUser(
    emailPhoneNumberPasswordDto: EmailPhoneNumberPasswordDto,
  ): Promise<UserResponse> {
    const userObservable = this.userService.checkPasswordCombination({
      password: emailPhoneNumberPasswordDto.password,
      email: emailPhoneNumberPasswordDto.email,
      phoneNumber: emailPhoneNumberPasswordDto.phoneNumber,
    }) as Observable<UserResponse>;

    return await firstValueFrom(userObservable);
  }

  async login(user: UserResponse) {
    const payload = {
      username: user.email || user.phoneNumber,
      sub: user.id,
      isEmail: !!user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    return new SignInResponseDto(accessToken);
  }
}
