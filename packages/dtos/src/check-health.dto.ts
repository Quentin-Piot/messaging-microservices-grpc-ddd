import type { HealthCheckResult, HealthCheckStatus, HealthIndicatorResult } from "@nestjs/terminus";

export type HealthDetails = HealthIndicatorResult;
export type HealthError  = HealthIndicatorResult;
export type HealthInfo  = HealthIndicatorResult;
export type HealthStatus = HealthCheckStatus;

export class HealthCheckResponse implements HealthCheckResult {
  details: HealthDetails;
  error: HealthError;
  info: HealthInfo;
  status: HealthStatus;
}
