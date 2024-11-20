import { Controller, Get } from "@nestjs/common";
import { GRPCHealthIndicator, HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { join } from "path";

@Controller("")
export class AppController {
  constructor(
    private health: HealthCheckService,
    private grpc: GRPCHealthIndicator,
  ) {
  }

  @Get("/health")
  @HealthCheck()
  async check() {
    return this.health.check([
      async () =>
        this.grpc.checkService("user_service", "user_service", {
          timeout: 500,
          package: "user",
          protoPath: join(__dirname, "..", "node_modules", "@quentinpiot", "protos", "user.proto"),
          url: process.env.NODE_ENV === "development" ? "localhost:5000" : "user-service:5000", // URL du microservice
        }),
    ]);
  }


  @Get()
  getHome(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Quentin Piot personals projects apis and documentations">
          <meta name="author" content="Quentin Piot">
          <meta name="viewport" content="width=device-width, initial-">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
          <title>API - Quentin Piot</title>
          <style>
            body {
              background-color: black;
              color: white;
              font-family: 'Roboto', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              overflow: hidden;
              margin: 0;
              text-align: center;
            }
            h1 {
              font-size: 4rem;
              margin-bottom: 20px;
            }
            p {
              font-size: 1.2rem;
            }
            a {
              color: white;
              text-decoration: none;
              transition: color 0.3s ease;
            }
            a:hover {
              color: #ff8084;
            }
            .container {
              padding: 40px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 16px;
              box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); 
              backdrop-filter: blur(5px);
              -webkit-backdrop-filter: blur(5px);
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .welcome {
              font-weight: bold;
              color: #ffffff;
            }
            @keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gradient {
  position: absolute;
  left: calc(50% - 25vw);
  top: calc(50% - 25vw);
  width: 50vw;
  height: 50vw;
  filter: blur(calc(750px / 5));
  background-image:linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  animation: rotate 10s cubic-bezier(0.8, 0.2, 0.2, 0.8) alternate infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

@media (max-width: 1000px) {
  .gradient {

  left: calc(50% - 25vh);
  top: calc(50% - 25vh);
  width: 50vh;
  height: 50vh;  }
}


/* This is just to transition when you change the viewport size. */
* {
  transition: all 0.5s ease-out;
}

          </style>
        </head>
        <body>
          <div class="gradient"></div>
          <div class="container">
            <h2 class="welcome">Building in progress</h2>
            <p style="font-size: 0">Quentin Piot</p>
          </div>
        </body>
      </html>
    `;
  }
}
