import { apiRequest } from "./apiService";

export const categoryService = {
  getAll: (token: string) =>
    apiRequest(
      "/categories",
      {
        method: "GET",
      },
      token
    ),

  create: (
    name: string,
    token: string
  ) =>
    apiRequest(
      "/categories",
      {
        method: "POST",
        body: JSON.stringify({ name }),
      },
      token
    ),

  update: (
    id: number,
    name: string,
    token: string
  ) =>
    apiRequest(
      `/categories/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ name }),
      },
      token
    ),

  delete: (
    id: number,
    token: string
  ) =>
    apiRequest(
      `/categories/${id}`,
      {
        method: "DELETE",
      },
      token
    ),
};