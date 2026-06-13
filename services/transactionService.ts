import { apiRequest } from "./apiService";

export const transactionService = {
  getAll: (token: string) =>
    apiRequest(
      "/transactions",
      {
        method: "GET",
      },
      token
    ),

  getBalance: (token: string) =>
    apiRequest(
      "/transactions/balance",
      {
        method: "GET",
      },
      token
    ),

  create: (
    data: any,
    token: string
  ) =>
    apiRequest(
      "/transactions",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      token
    ),

  update: (
    id: number,
    data: any,
    token: string
  ) =>
    apiRequest(
      `/transactions/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      token
    ),

  delete: (
    id: number,
    token: string
  ) =>
    apiRequest(
      `/transactions/${id}`,
      {
        method: "DELETE",
      },
      token
    ),
};
