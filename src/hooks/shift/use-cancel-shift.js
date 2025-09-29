import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";

/**
 * Hook to cancel a shift.
 */
export const useCancelShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shiftId) => {
      return shiftApi.cancelShift({}, shiftId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
    onError: (error) => {
      console.error("Error cancelling shift:", error);
    },
  });
};
