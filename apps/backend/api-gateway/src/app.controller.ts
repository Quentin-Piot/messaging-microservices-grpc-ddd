import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, GRPCHealthIndicator } from "@nestjs/terminus";
import { join } from "path";

@Controller("")
export class AppController {
  constructor(
    private health: HealthCheckService,
    private grpc: GRPCHealthIndicator,
  ) {}

  @Get("/health")
  @HealthCheck()
  async check() {
    return this.health.check([
      async () =>
        this.grpc.checkService("user_service","user_service", {
          timeout: 500,
          package: "user",
          protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
          url: process.env.NODE_ENV === "development" ? "localhost:5000" : "user-service:5000", // URL du microservice
        }),
    ]);
  }
}
