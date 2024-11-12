import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const grpcClientOptions: ClientProviderOptions = {
  name: "USER_PACKAGE",
  transport: Transport.GRPC,
  options: {
    package: "user",
    protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
    url: "user-service:5000",
  },
};
