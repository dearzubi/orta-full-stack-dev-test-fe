import {
  shiftsAPIResponseSchema,
  shiftSchema,
  batchShiftsResponseSchema,
} from "./schemas.js";
import { z } from "zod";
import { apiClient } from "../../utils/api-client.js";

const getShiftsSearchParams = ({ page, limit, status, sortBy, sortOrder }) => {
  const params = new URLSearchParams();

  if (page != null) params.append("page", page.toString());
  if (limit != null) params.append("limit", limit.toString());
  if (status != null) params.append("status", status);
  if (sortBy != null) params.append("sortBy", sortBy);
  if (sortOrder != null) params.append("sortOrder", sortOrder);

  return params;
};

export const shiftApi = {
  getAllShifts: (config, page, limit, status, sortBy, sortOrder) => {
    const params = getShiftsSearchParams({
      page,
      limit,
      status,
      sortBy,
      sortOrder,
    });

    return apiClient.makeRequest({
      ...config,
      url: `/shifts${params.toString() ? `?${params.toString()}` : ""}`,
      method: "GET",
      schema: shiftsAPIResponseSchema,
    });
  },
  getWorkersShifts: (config, page, limit, status, sortBy, sortOrder) => {
    const params = getShiftsSearchParams({
      page,
      limit,
      status,
      sortBy,
      sortOrder,
    });

    return apiClient.makeRequest({
      ...config,
      url: `/shifts/my-shifts${params.toString() ? `?${params.toString()}` : ""}`,
      method: "GET",
      schema: shiftsAPIResponseSchema,
    });
  },
  createShift: (config) =>
    apiClient.makeRequest({
      ...config,
      url: "/shifts",
      method: "POST",
      schema: z.object({ shift: shiftSchema }),
    }),
  updateShift: (config, shiftId) =>
    apiClient.makeRequest({
      ...config,
      url: `/shifts/${shiftId}`,
      method: "PUT",
      schema: z.object({ shift: shiftSchema }),
    }),
  getShift: (config, shiftId) =>
    apiClient.makeRequest({
      ...config,
      url: `/shifts/${shiftId}`,
      method: "GET",
      schema: z.object({ shift: shiftSchema }),
    }),
  cancelShift: (config, shiftId) =>
    apiClient.makeRequest({
      ...config,
      url: `/shifts/${shiftId}/cancel`,
      method: "PATCH",
      schema: z.object({ message: z.string() }),
    }),
  deleteShift: (config, shiftId) =>
    apiClient.makeRequest({
      ...config,
      url: `/shifts/${shiftId}`,
      method: "DELETE",
      schema: z.object({ message: z.string() }),
    }),
  clockInShift: (config, shiftId) =>
    apiClient.makeRequest({
      ...config,
      url: `/shifts/${shiftId}/clock-in`,
      method: "PATCH",
      schema: z.object({ message: z.string() }),
    }),
  clockOutShift: (config, shiftId) =>
    apiClient.makeRequest({
      ...config,
      url: `/shifts/${shiftId}/clock-out`,
      method: "PATCH",
      schema: z.object({ message: z.string() }),
    }),
  createBatchShifts: (config) =>
    apiClient.makeRequest({
      ...config,
      url: "/shifts/batch",
      method: "POST",
      schema: batchShiftsResponseSchema,
    }),
};
