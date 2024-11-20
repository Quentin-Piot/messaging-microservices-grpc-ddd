import { HealthCheckResponse } from "@quentinpiot/dtos";

import api from "@/api/helpers/api.ts";

export const getHealthStatus = async () => {
  try {
    const healthCheckResponse = await api.get<HealthCheckResponse>("health");
    return healthCheckResponse.details;
  } catch (e) {
    throw e;
  }
};
