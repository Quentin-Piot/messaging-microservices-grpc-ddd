import type { HealthCheckResult, HealthCheckStatus, HealthIndicatorResult } from "@nestjs/terminus";

export class HealthCheckResponse implements HealthCheckResult {
  details: HealthIndicatorResult;
  error: HealthIndicatorResult;
  info: HealthIndicatorResult;
  status: HealthCheckStatus;
}
