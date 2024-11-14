import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./user/user.controller";
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "user",
          protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
          url: "localhost:5000",
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class AppModule {
}
