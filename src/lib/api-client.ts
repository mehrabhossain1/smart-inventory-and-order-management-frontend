import {API_BASE_URL} from "@/config/api-endpoints";

class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        const isAuthEndpoint = path.startsWith("/auth/");
        if (!isAuthEndpoint && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        const errData = await res.json().catch(() => ({}));
        throw new ApiError(errData.message || "Unauthorized", 401);
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new ApiError(
            data.message || `Request failed with status ${res.status}`,
            res.status
        );
    }

    return data as T;
}

export const apiClient = {
    get: <T>(path: string, params?: Record<string, string | number | undefined>) => {
        let url = path;
        if (params) {
            const filtered = Object.entries(params).filter(
                ([, v]) => v !== undefined && v !== ""
            );
            if (filtered.length > 0) {
                url += "?" + new URLSearchParams(
                    filtered.map(([k, v]) => [k, String(v)])
                ).toString();
            }
        }
        return request<T>(url);
    },

    post: <T>(path: string, body?: unknown) =>
        request<T>(path, {
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: <T>(path: string, body?: unknown) =>
        request<T>(path, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        }),

    del: <T>(path: string) =>
        request<T>(path, {method: "DELETE"}),
};

export {ApiError};
