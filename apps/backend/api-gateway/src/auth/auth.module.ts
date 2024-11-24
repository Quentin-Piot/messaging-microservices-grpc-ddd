import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";

import { join } from "path";

import { JwtStrategy } from "@/auth/jwt.strategy";
import { LocalEmailStrategy } from "@/auth/local-email.strategy";
import { LocalPhoneStrategy } from "@/auth/local-phone.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "5m" },
    }),
    ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "user",
          protoPath: join(
            __dirname,
            "..",
            "..",
            "node_modules",
            "@quentinpiot",
            "protos",
            "user.proto",
          ),
          url:
            process.env.NODE_ENV === "development"
              ? "localhost:5000"
              : "user-service:5000",
        },
      },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, LocalEmailStrategy, AuthService, LocalPhoneStrategy],
  exports: [AuthService],
})
export class AuthModule {}
