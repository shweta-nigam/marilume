import { z } from "zod";

export const CreateCalendarEventSchema = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string().optional(),
  })
  .refine(
    (data) => data.endTime > data.startTime,
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export const UpdateCalendarEventSchema =
  CreateCalendarEventSchema.extend({
    id: z.string().min(1),
  });

export type CreateCalendarEventInput =
  z.infer<typeof CreateCalendarEventSchema>;

export type UpdateCalendarEventInput =
  z.infer<typeof UpdateCalendarEventSchema>;