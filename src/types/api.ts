/**
 * Standard API contracts matching webapp backend conventions.
 */

export interface ApiPaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: ApiPaginationMeta;
}

export interface ApiErrorDetail {
  field?: string;
  issue: string;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorPayload;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiClientError extends Error {
  public statusCode: number;
  public code: string;
  public details?: ApiErrorDetail[];

  constructor(message: string, statusCode: number = 500, code: string = 'UNKNOWN_ERROR', details?: ApiErrorDetail[]) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
