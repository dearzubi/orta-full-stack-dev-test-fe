import z from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().trim().nonempty(),
  VITE_DISABLE_API_CACHING: z
    .stringbool({
      truthy: ["true", "TRUE", "1"],
      falsy: ["false", "FALSE", "0"],
    })
    .optional()
    .default(false),
});

const envServerSchemaResult = envSchema.safeParse(import.meta.env);

if (!envServerSchemaResult.success) {
  console.error("Env Issue: ", envServerSchemaResult.error.issues);
  throw new Error(
    "There is an error with the frontend environment variables. Please check the console logs for more details.",
  );
}

export const envs = {
  ...import.meta.env,
  ...envServerSchemaResult.data,
};
