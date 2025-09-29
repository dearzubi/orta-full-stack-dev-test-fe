import { z } from "zod";

export const loginUserAPIResponse = z.object({
  token: z.string({ error: "Auth token was expected" }),
  user: z.object(
    {
      id: z.string({ error: "User id must be non-empty string" }),
      name: z.string({ error: "User name must be non-empty string" }),
      email: z.email({ error: "A valid user email was expected" }),
      role: z.enum(["worker", "admin"], {
        error: "User role must be admin or worker",
      }),
    },
    { error: "User info was expected" },
  ),
});

export const forgotPasswordAPIResponse = z.object({
  message: z.string({ error: "Message was expected" }),
});

export const resetPasswordAPIResponse = z.object({
  message: z.string({ error: "Message was expected" }),
});
