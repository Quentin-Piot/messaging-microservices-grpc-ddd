import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const grpcClientOptions: ClientProviderOptions = {
  name: "USER_PACKAGE",
  transport: Transport.GRPC,
  options: {
    package: "user",
    protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
    url: (process.env.NODE_ENV === "development") ?  "localhost:5000" : "user-service:5000",
  },
};
