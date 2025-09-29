import { apiClient } from "../../utils/api-client.js";
import { getAllWorkerAPIResponseSchema } from "./schemas.js";

export const workerApi = {
  getAllWorkers: (config) => {
    return apiClient.makeRequest({
      ...config,
      url: "/workers/all",
      method: "GET",
      schema: getAllWorkerAPIResponseSchema,
    });
  },
};
