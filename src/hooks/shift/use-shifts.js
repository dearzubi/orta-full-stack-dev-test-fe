import { useQuery } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";
import { shiftsAPIResponseSchema } from "../../apis/shift/schemas.js";
import { useUserStore } from "../../stores/user.store.js";
import { apiClient } from "../../utils/api-client.js";
import { envs } from "../../utils/env-schema.js";

/**
 * Hook to fetch shifts with pagination, filtering, and sorting
 * @param page {number} Page number (default: 1)
 * @param limit {number} Number of items per page (default: 10)
 * @param status {string|null} Filter by shift status (e.g. Scheduled, Completed) (default: null)
 * @param sortBy {string} Field to sort by (default: "date")
 * @param sortOrder {string} Sort order ("asc" or "desc") (default: "asc")
 * @param enabled {boolean} Whether the query is enabled (default: true)
 */
export const useShifts = ({
  page = 1,
  limit = 10,
  status = null,
  sortBy = "date",
  sortOrder = "asc",
  enabled = true,
}) => {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const queryKey = [
    "shifts",
    {
      page,
      limit,
      status,
      sortBy,
      sortOrder,
      userId: user?.id,
      isAdmin,
    },
  ];

  const queryFn = async () => {
    const config = {};

    if (isAdmin) {
      return shiftApi.getAllShifts(
        config,
        page,
        limit,
        status || null,
        sortBy,
        sortOrder,
      );
    } else {
      return shiftApi.getWorkersShifts(
        config,
        page,
        limit,
        status || null,
        sortBy,
        sortOrder,
      );
    }
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !!user,
    staleTime: envs.VITE_DISABLE_API_CACHING ? 0 : 5 * 60 * 1000, // 5 minutes if caching enabled
    gcTime: envs.VITE_DISABLE_API_CACHING ? 0 : 10 * 60 * 1000, // 10 minutes if caching enabled
    refetchOnWindowFocus: !envs.VITE_DISABLE_API_CACHING,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
