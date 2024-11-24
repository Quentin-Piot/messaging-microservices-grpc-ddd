import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TerminusModule } from "@nestjs/terminus";

import { join } from "path";

import { AuthService } from "@/auth/auth.service";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { LocalEmailStrategy } from "@/auth/local-email.strategy";
import { LocalPhoneStrategy } from "@/auth/local-phone.strategy";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    HttpModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
