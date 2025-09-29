import { z } from "zod";

export const shiftSchema = z.object({
  id: z.string(),
  title: z.string(),
  role: z.string(),
  typeOfShift: z.array(
    z.enum(["Weekend", "Weekday", "Evening", "Morning", "Night"]),
  ),
  startTime: z.string(),
  finishTime: z.string(),
  numOfShiftsPerDay: z.number(),
  date: z.string(),
  status: z.enum(["Scheduled", "In Progress", "Completed", "Cancelled"]),
  clockInTime: z.string().nullable(),
  clockOutTime: z.string().nullable(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(["admin", "worker"]),
  }),
  location: z.object({
    id: z.string(),
    name: z.string(),
    postCode: z.string(),
    address: z.string(),
    coordinates: z.object({
      longitude: z.number(),
      latitude: z.number(),
    }),
  }),
});

export const batchShiftsResponseSchema = z.object({
  created: z.array(shiftSchema),
  errors: z.array(
    z.object({
      index: z.number(),
      shift: z.object({
        title: z.string(),
        role: z.string(),
        typeOfShift: z.array(
          z.enum(["Weekend", "Weekday", "Evening", "Morning", "Night"]),
        ),
        startTime: z.string(),
        finishTime: z.string(),
        numOfShiftsPerDay: z.number(),
        date: z.string(),
        user: z.string(),
        location: z.object({
          name: z.string(),
          address: z.string(),
          postCode: z.string(),
          cordinates: z.object({
            longitude: z.number(),
            latitude: z.number(),
          }),
        }),
      }),
      error: z.object({
        message: z.string(),
        errorCode: z.string(),
      }),
    }),
  ),
});

export const shiftsAPIResponseSchema = z.object({
  shifts: z.array(shiftSchema),
  pagination: z.object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().min(0),
    totalCount: z.number().int().min(0),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    limit: z.number().int().positive(),
  }),
});
