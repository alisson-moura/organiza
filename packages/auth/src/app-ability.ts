import { MongoAbility } from "@casl/ability";
import { z } from "zod";
import { userSubject } from "./models/user";
import { inviteSubject } from "./models/invite";
import { groupSubject } from "./models/group";
import { listSubject } from "./models/list";
import { itemSubject } from "./models/item";

const appAbilitiesSchema = z.union([
  userSubject,
  inviteSubject,
  groupSubject,
  listSubject,
  itemSubject,
]);
type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
