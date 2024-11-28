const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_GATEWAY_URL is not defined in the environment.");
}

class ApiHelper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: "GET" | "POST",
    url: string,
    body?: unknown,
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${url}`, options);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || `Request failed with status ${response.status}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>("GET", url);
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>("POST", url, body);
  }
}

const api = new ApiHelper(API_BASE_URL);

export default api;
