import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { join } from "path";

import { AuthController } from "@/auth/auth.controller";
import { AuthModule } from "@/auth/auth.module";
import { AuthService } from "@/auth/auth.service";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { LocalEmailStrategy } from "@/auth/local-email.strategy";
import { LocalPhoneStrategy } from "@/auth/local-phone.strategy";
import { UserController } from "@/user/user.controller";

@Module({
  imports: [
    AuthModule,
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
  ],

  controllers: [UserController],
})
export class UserModule {}
