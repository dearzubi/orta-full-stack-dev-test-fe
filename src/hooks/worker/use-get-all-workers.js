import { useQuery } from "@tanstack/react-query";
import { workerApi } from "../../apis/worker/worker.api.js";
import { envs } from "../../utils/env-schema.js";

/**
 * Hook to get all workers from the API
 * @param enabled - whether the query should be enabled
 */
export const useGetAllWorkers = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["workers", "all"],
    queryFn: async () => {
      return workerApi.getAllWorkers({});
    },
    enabled,
    staleTime: envs.VITE_DISABLE_API_CACHING ? 0 : 10 * 60 * 1000, // 10 minutes if caching enabled
    gcTime: envs.VITE_DISABLE_API_CACHING ? 0 : 15 * 60 * 1000, // 15 minutes if caching enabled
    refetchOnWindowFocus: !envs.VITE_DISABLE_API_CACHING,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
