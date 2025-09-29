import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";
import { apiClient } from "../../utils/api-client.js";

/**
 * Hook to update a shift for a worker
 */
export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ shiftId, shiftData }) => {
      return shiftApi.updateShift({ data: shiftData }, shiftId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
    onError: (error) => {
      console.error("Error updating shift:", error);
    },
  });
};
