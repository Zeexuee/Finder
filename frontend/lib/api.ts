import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Auth APIs
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post("/auth/register", data),
  login: (data: { email: string; password: string }) => apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
  getMe: () => apiClient.get("/auth/me"),
};

// Search APIs
export const searchAPI = {
  search: (data: { query: string; fieldOfStudy?: string; limit?: number }) =>
    apiClient.post("/search", data),
  getDetail: (id: string) => apiClient.get(`/search/${id}`),
  getRelated: (id: string, limit?: number) =>
    apiClient.get(`/search/${id}/related`, { params: { limit } }),
  recommendMethod: (keywords: string[]) =>
    apiClient.post("/search/recommend-method", { keywords }),
};

// Dataset APIs
export const datasetAPI = {
  getAll: (params?: { fieldOfStudy?: string; limit?: number; skip?: number }) =>
    apiClient.get("/dataset", { params }),
  getDetail: (id: string) => apiClient.get(`/dataset/${id}`),
  download: (id: string) => apiClient.post(`/dataset/${id}/download`),
};

// Payment APIs
export const paymentAPI = {
  create: (data: { itemType: string; itemId: string; amount: number }) =>
    apiClient.post("/payment/create", data),
  getStatus: (transactionId: string) => apiClient.get(`/payment/${transactionId}`),
};

export default apiClient;
