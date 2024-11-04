import { z } from "zod";

export const groupSchema = z.object({
  __typename: z.literal("Group").default("Group"),
  id: z.string(),
});
export type Group = z.infer<typeof groupSchema>;

export const groupSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('view'),
    ]),
    z.union([z.literal('Group'), groupSchema])

]);
export type GroupSubject = z.infer<typeof groupSchema>
