import api from "@/api/helpers/api.ts";
import { HealthCheckResponse } from "@quentinpiot/dtos";

export const getHealthStatus = async () => {
  try {
    const healthCheckResponse = await api.get<HealthCheckResponse>("health");
    return healthCheckResponse.details;
  } catch (e) {
    throw e;
  }
};