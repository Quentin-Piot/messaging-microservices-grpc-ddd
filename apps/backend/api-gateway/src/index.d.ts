import type { Request as OriginalRequest } from "express";

import type { UserResponse } from "@quentinpiot/protos/generated/user";

declare module "express" {
  interface Request extends OriginalRequest {
    user: UserResponse;
  }
}
