import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftApi } from "../../apis/shift/shift.api.js";

/**
 * Hook to batch create shifts for a worker
 */
export const useCreateBatchShifts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shiftsData) => {
      return shiftApi.createBatchShifts({ data: { shifts: shiftsData } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
    onError: (error) => {
      console.error("Error creating batch shifts:", error);
    },
  });
};
