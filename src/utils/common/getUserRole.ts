interface Role {
  authority: string;
}

export function getUserRole(roles: Role[]): boolean {
  return roles.some(role => role.authority === "ROLE_ADMIN");
}

