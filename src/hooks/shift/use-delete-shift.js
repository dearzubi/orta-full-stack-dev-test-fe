import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";

/**
 * Hooke to permanently delete a shift by its ID.
 */
export const useDeleteShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shiftId) => {
      return shiftApi.deleteShift({}, shiftId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
    onError: (error) => {
      console.error("Error deleting shift:", error);
    },
  });
};
