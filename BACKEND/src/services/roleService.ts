import {
  Role,
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../repositories/roleRepository.js";

export async function findAllRoles(): Promise<Role[]> {
  return getAllRoles();
}

export async function findRoleById(role_id: number): Promise<Role | null> {
  return getRoleById(role_id);
}

export async function addRole(name: string): Promise<Role> {
  return createRole(name);
}

export async function modifyRole(
  role_id: number,
  name: string
): Promise<Role | null> {
  return updateRole(role_id, name);
}

export async function removeRole(role_id: number): Promise<boolean> {
  return deleteRole(role_id);
}
