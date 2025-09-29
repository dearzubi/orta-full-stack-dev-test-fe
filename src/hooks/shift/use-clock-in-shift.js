import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";

/**
 * Hook to handle clocking in to a shift by assigned worker
 */
export const useClockInShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shiftId) => {
      return shiftApi.clockInShift({}, shiftId);
    },
    onSuccess: (data, shiftId) => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
      queryClient.invalidateQueries({ queryKey: ["shifts", shiftId] });
    },
    onError: (error) => {
      console.error("Error clocking in shift:", error);
    },
  });
};
