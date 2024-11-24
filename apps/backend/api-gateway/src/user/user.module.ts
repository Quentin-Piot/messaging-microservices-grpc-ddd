import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { join } from "path";

import { AuthController } from "@/auth/auth.controller";
import { UserController } from "@/user/user.controller";

@Module({
  imports: [
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
