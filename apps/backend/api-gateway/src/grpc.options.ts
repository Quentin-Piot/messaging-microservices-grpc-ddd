import { ClientProviderOptions, ClientsModuleOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const grpcClientOptions: ClientProviderOptions = {
  name: "USER_PACKAGE",
  transport: Transport.GRPC,
  options: {
    package: "user",
    protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
    url: "localhost:5000",
  },
};
