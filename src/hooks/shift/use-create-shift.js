import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";
import { apiClient } from "../../utils/api-client.js";

/**
 * Hook to create a single new shift for a worker
 */
export const useCreateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shiftData) => {
      return shiftApi.createShift({ data: shiftData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
    onError: (error) => {
      console.error("Error creating shift:", error);
    },
  });
};
