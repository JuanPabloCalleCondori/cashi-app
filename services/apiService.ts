const API_URL =
  "https://cashi-api-bnii.onrender.com";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export const apiRequest = async (
  endpoint: string,
  options?: RequestInit,
  token?: string
) => {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),

          ...(options?.headers ?? {}),
        },
      }
    );

    const body = await response.json().catch(
      () => null
    );

    if (!response.ok) {
      throw new ApiError(
        response.status,
        body?.message ??
          body?.error ??
          "Error"
      );
    }

    return body;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(
      "Error de conexión"
    );
  }
};
