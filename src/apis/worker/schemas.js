import { z } from "zod";

export const getAllWorkerAPIResponseSchema = z.array(
  z.object(
    {
      id: z.string({ error: "Worker id must be non-empty string" }),
      name: z.string({ error: "Worker name must be non-empty string" }),
      email: z.email({ error: "A valid Worker email was expected" }),
      role: z.literal("worker", {
        error: "Worker role must be or worker",
      }),
    },
    { error: "Worker info was expected" },
  ),
);
