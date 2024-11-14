import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { status as GrpcStatus } from "@grpc/grpc-js";

export const HTTP_STATUS_CODE: Record<number, number> = {
  [HttpStatus.BAD_REQUEST]: GrpcStatus.INVALID_ARGUMENT,
  [HttpStatus.UNAUTHORIZED]: GrpcStatus.UNAUTHENTICATED,
  [HttpStatus.FORBIDDEN]: GrpcStatus.PERMISSION_DENIED,
  [HttpStatus.NOT_FOUND]: GrpcStatus.NOT_FOUND,
  [HttpStatus.CONFLICT]: GrpcStatus.ALREADY_EXISTS,
  [HttpStatus.GONE]: GrpcStatus.ABORTED,
  [HttpStatus.TOO_MANY_REQUESTS]: GrpcStatus.RESOURCE_EXHAUSTED,
  499: GrpcStatus.CANCELLED,
  [HttpStatus.INTERNAL_SERVER_ERROR]: GrpcStatus.INTERNAL,
  [HttpStatus.NOT_IMPLEMENTED]: GrpcStatus.UNIMPLEMENTED,
  [HttpStatus.BAD_GATEWAY]: GrpcStatus.UNKNOWN,
  [HttpStatus.SERVICE_UNAVAILABLE]: GrpcStatus.UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: GrpcStatus.DEADLINE_EXCEEDED,
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: GrpcStatus.UNAVAILABLE,
  [HttpStatus.PAYLOAD_TOO_LARGE]: GrpcStatus.OUT_OF_RANGE,
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: GrpcStatus.CANCELLED,
  [HttpStatus.UNPROCESSABLE_ENTITY]: GrpcStatus.CANCELLED,
  [HttpStatus.I_AM_A_TEAPOT]: GrpcStatus.UNKNOWN,
  [HttpStatus.METHOD_NOT_ALLOWED]: GrpcStatus.CANCELLED,
  [HttpStatus.PRECONDITION_FAILED]: GrpcStatus.FAILED_PRECONDITION,
};

@Injectable()
export class GrpcToHttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const grpcCode = error.code;
        const httpStatus = this.getHttpStatusFromGrpcCode(grpcCode);

        if (httpStatus) {
          const errorMessage = error.details || "An error occurred";
          return throwError(
            () => new HttpException(errorMessage, httpStatus),
          );
        }

        // Default to internal server error if no matching HTTP status found
        return throwError(
          () => new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
        );
      }),
    );
  }

  // Convert gRPC code to HTTP status code based on the mapping
  private getHttpStatusFromGrpcCode(grpcCode: number): number | undefined {
    const entries = Object.entries(HTTP_STATUS_CODE);
    for (const [httpStatus, mappedGrpcCode] of entries) {
      if (mappedGrpcCode === grpcCode) {
        return parseInt(httpStatus, 10);
      }
    }
    return undefined;
  }
}
