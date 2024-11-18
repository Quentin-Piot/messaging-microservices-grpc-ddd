import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./user/user.controller";
import { join } from "path";
import { AppController } from "./app.controller";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TerminusModule, HttpModule, ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "user",
          protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
          url: (process.env.NODE_ENV === "development") ? "localhost:5000" : "user-service:5000",
        },
      },
    ]),
  ],
  controllers: [UserController, AppController],
})
export class AppModule {
}
