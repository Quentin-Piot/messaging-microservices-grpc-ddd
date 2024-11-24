import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalPhoneNumberAuthGuard extends AuthGuard("local-phone") {}
