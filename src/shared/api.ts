const BASE_URL = "https://mocnydomapi.azure-api.net";

export async function api<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    if (response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API Error");
    }

    return response.json();
}