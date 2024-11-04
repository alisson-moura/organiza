import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
} from "@casl/ability";
import { User } from "./models/user";
import { AppAbility } from "./app-ability";
import { permissions } from "./permissions";
import { listSchema } from "./models/list";

export function defineAbilityFor(user: User): AppAbility {
  const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] != "function") {
    throw new Error("Permissions for role ${user.role} not found.");
  }

  permissions[user.role](user, builder);
  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename!;
    },
  });

  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability;
}
