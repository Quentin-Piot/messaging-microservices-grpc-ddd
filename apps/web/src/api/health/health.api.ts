import { HealthCheckResponse, HealthDetails } from "@quentinpiot/dtos";

import api from "@/api/helpers/api.ts";

export const getHealthStatus = async (): Promise<HealthDetails> => {
  const healthCheckResponse = await api.get<HealthCheckResponse>("health");
  return healthCheckResponse.details;
};
