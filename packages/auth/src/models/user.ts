import { z } from "zod";
import { rolesSchema } from "./role";

export const userSchema = z.object({
  __typename: z.literal("User").default("User").optional(),
  id: z.string(),
  role: rolesSchema,
  groupId: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const userSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("view"),
  ]),
  z.union([z.literal("User"), userSchema]),
]);
export type UserSubject = z.infer<typeof userSubject>;
