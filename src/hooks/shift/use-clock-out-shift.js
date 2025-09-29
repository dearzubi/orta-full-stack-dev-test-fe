import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";

/**
 * Hook to clock out a shift by assigned worker.
 */
export const useClockOutShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shiftId) => {
      return shiftApi.clockOutShift({}, shiftId);
    },
    onSuccess: (data, shiftId) => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
      queryClient.invalidateQueries({ queryKey: ["shifts", shiftId] });
    },
    onError: (error) => {
      console.error("Error clocking out shift:", error);
    },
  });
};
