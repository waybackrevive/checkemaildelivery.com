import type {
  CreateTestResponse,
  TestStatusResponse,
  EmailReport,
} from "@/types/report";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Log API base URL in development for debugging
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("[API] Base URL:", API_BASE);
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_BASE}${path}`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new ApiError(body || `Request failed: ${res.status}`, res.status);
    }

    return res.json();
  } catch (err) {
    // If it's already an ApiError, rethrow it
    if (err instanceof ApiError) throw err;
    
    // Network errors (CORS, connection failed, etc.)
    throw new Error(err instanceof Error ? err.message : "Network error");
  }
}

/**
 * POST /api/test/create — Start a new test. Returns the unique test email.
 */
export async function createTest(): Promise<CreateTestResponse> {
  return request<CreateTestResponse>("/api/test/create", { method: "POST" });
}

/**
 * GET /api/test/{id}/status — Poll waiting screen.
 */
export async function getTestStatus(id: string): Promise<TestStatusResponse> {
  return request<TestStatusResponse>(`/api/test/${id}/status`);
}

/**
 * GET /api/report/{id} — Full report data.
 */
export async function getReport(id: string): Promise<EmailReport> {
  return request<EmailReport>(`/api/report/${id}`);
}

export { ApiError };
