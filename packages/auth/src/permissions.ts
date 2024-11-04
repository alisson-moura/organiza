import { AbilityBuilder } from "@casl/ability";
import { AppAbility } from "./app-ability";
import { User } from "./models/user";
import { Role } from "./models/role";

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  Lider: function (user: User, builder: AbilityBuilder<AppAbility>): void {
    builder.can("manage", "Group", { id: { $eq: user.groupId } });
    builder.can("manage", "User", { id: { $eq: user.id } });

    builder.can("create", "Invite", { groupId: { $eq: user.groupId } });
    builder.can("view", "Invite", { groupId: { $eq: user.groupId } });
    builder.can("revoke", "Invite", { groupId: { $eq: user.groupId } });

    builder.can("manage", "List", { groupId: { $eq: user.groupId } });
    builder.can("manage", "Item", { groupId: { $eq: user.groupId } });
  },
  Organizador: function (
    user: User,
    builder: AbilityBuilder<AppAbility>
  ): void {
    builder.can("manage", "User", { id: { $eq: user.id } });
    builder.can("view", "Group", { id: { $eq: user.groupId } });

    builder.can("create", "Invite", { groupId: { $eq: user.groupId } });
    builder.can("view", "Invite", { groupId: { $eq: user.groupId } });
    builder.can("revoke", "Invite", { groupId: { $eq: user.groupId } });

    builder.can("manage", "List", { groupId: { $eq: user.groupId } });
    builder.can("manage", "Item", { groupId: { $eq: user.groupId } });
  },
  Participante: function (
    user: User,
    builder: AbilityBuilder<AppAbility>
  ): void {
    builder.can("manage", "User", { id: { $eq: user.id } });
    builder.can("view", "Group", { id: { $eq: user.groupId } });

    builder.can("view", "List", { groupId: { $eq: user.groupId } });
    builder.can("view", "Item", { groupId: { $eq: user.groupId } });
    builder.can("check", "Item", { groupId: { $eq: user.groupId } });
    builder.can("uncheck", "Item", { groupId: { $eq: user.groupId } });
  },
  Observador: function (user: User, builder: AbilityBuilder<AppAbility>): void {
    builder.can("manage", "User", { id: { $eq: user.id } });
    builder.can("view", "Group", { id: { $eq: user.groupId } });

    builder.can("view", "List", { groupId: { $eq: user.groupId } });
    builder.can("view", "Item", { groupId: { $eq: user.groupId } });
  },
};
