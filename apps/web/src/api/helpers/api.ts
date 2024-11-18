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
    method: 'GET' | 'POST',
    url: string,
    body?: unknown
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
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
        // Parse error response from backend
        const error = await response.json();
        throw new Error(error.message || `Request failed with status ${response.status}`);
      }

      // Parse and return JSON response
      return (await response.json()) as T;
    } catch (error) {
      // Re-throw error for the caller to handle
      throw error;
    }
  }

  // GET method
  async get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url);
  }

  // POST method
  async post<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>('POST', url, body);
  }
}

// Export an instance of the API helper
const api = new ApiHelper(API_BASE_URL);

export default api;
