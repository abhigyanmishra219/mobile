import { Platform } from 'react-native';
import { ApiClientError, ApiSuccessResponse, ApiResponse } from '@/types/api';

/**
 * Default fallback base URL depending on execution platform:
 * - Android emulator maps host machine localhost to 10.0.2.2
 * - iOS simulator maps host machine localhost to localhost
 */
const getDefaultBaseUrl = (): string => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }
  return 'http://localhost:3000';
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '') || getDefaultBaseUrl();
const DEFAULT_TIMEOUT_MS = 15000;

let authTokenGetter: (() => Promise<string | null> | string | null) | null = null;

/**
 * Configure an auth token retriever for Bearer authorization in subsequent phases (M2).
 */
export function setAuthTokenGetter(getter: () => Promise<string | null> | string | null) {
  authTokenGetter = getter;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions & { body?: unknown } = {}
): Promise<ApiSuccessResponse<T>> {
  const { params, timeoutMs = DEFAULT_TIMEOUT_MS, headers, body, ...restOptions } = options;

  let url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  if (params) {
    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    if (query) {
      url += (url.includes('?') ? '&' : '?') + query;
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(headers as Record<string, string>),
  };

  if (!(body instanceof FormData) && body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  if (authTokenGetter) {
    try {
      const token = await authTokenGetter();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    } catch {
      // In M1, token retrieval failures do not block public requests
    }
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let json: ApiResponse<T>;
    try {
      json = await response.json();
    } catch {
      throw new ApiClientError(
        `Failed to parse response from server (${response.status} ${response.statusText})`,
        response.status,
        'INVALID_RESPONSE'
      );
    }

    if (!response.ok || !json.success) {
      if (!json.success && json.error) {
        throw new ApiClientError(
          json.error.message || 'Server request failed',
          response.status,
          json.error.code || 'SERVER_ERROR',
          json.error.details
        );
      }
      throw new ApiClientError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    }

    return json as ApiSuccessResponse<T>;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiClientError) {
      throw err;
    }

    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new ApiClientError(
          `Request timed out after ${timeoutMs / 1000} seconds. Please check backend connection.`,
          408,
          'TIMEOUT'
        );
      }
      throw new ApiClientError(
        `Network error: ${err.message}. Ensure backend is running and accessible at ${BASE_URL}`,
        0,
        'NETWORK_ERROR'
      );
    }

    throw new ApiClientError('An unknown network error occurred', 0, 'UNKNOWN_ERROR');
  }
}

export const apiClient = {
  getBaseUrl: () => BASE_URL,
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body }),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
