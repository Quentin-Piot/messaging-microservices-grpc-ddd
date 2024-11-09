import { Module } from "@nestjs/common";
import { grpcClientOptions } from "./grpc.options";
import { ClientProxyFactory, ClientsModule } from "@nestjs/microservices";
import { UserController } from "./user/user.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [UserController],
})
export class AppModule {
}
