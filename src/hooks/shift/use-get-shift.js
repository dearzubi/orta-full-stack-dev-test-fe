import { useQuery } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";
import { apiClient } from "../../utils/api-client.js";
import { envs } from "../../utils/env-schema.js";

/**
 * Hook to get a shift by ID
 * @param shiftId {string} - ID of the shift to retrieve
 * @param enabled {boolean} - Whether the query should be enabled
 */
export const useGetShift = (shiftId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["shifts", shiftId],
    queryFn: async () => {
      return (await shiftApi.getShift({}, shiftId))?.shift;
    },
    enabled: enabled && !!shiftId,
    staleTime: envs.VITE_DISABLE_API_CACHING ? 0 : 5 * 60 * 1000, // 5 minutes if caching enabled
    gcTime: envs.VITE_DISABLE_API_CACHING ? 0 : 10 * 60 * 1000, // 10 minutes if caching enabled
    refetchOnWindowFocus: !envs.VITE_DISABLE_API_CACHING,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
