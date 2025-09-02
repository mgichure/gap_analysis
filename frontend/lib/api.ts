import { cookies } from "next/headers";

export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public problem: ProblemDetails,
    message?: string
  ) {
    super(message || problem.title);
    this.name = "ApiError";
  }
}

interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
}

async function getAuthHeader(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("Authentication");
    return authCookie ? `Bearer ${authCookie.value}` : undefined;
  } catch {
    return undefined;
  }
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { requireAuth = true, ...fetchOptions } = options;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add any additional headers from fetchOptions
  if (fetchOptions.headers) {
    Object.assign(headers, fetchOptions.headers);
  }

  if (requireAuth) {
    const authHeader = await getAuthHeader();
    if (authHeader) {
      headers.Authorization = authHeader;
    }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let problem: ProblemDetails;
    
    try {
      problem = await response.json();
    } catch {
      problem = {
        title: `HTTP ${response.status}`,
        status: response.status,
        detail: response.statusText,
      };
    }

    throw new ApiError(response.status, problem);
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return {} as T;
  }

  return response.json();
}

// Convenience methods
export const api = {
  get: <T = unknown>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = unknown>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
