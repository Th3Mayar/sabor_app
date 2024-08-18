import {
  User,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../repositories/userRepository";

export async function registerUser(user: Omit<User, "user_id">): Promise<User> {
  return createUser(user);
}

export async function findAllUsers(): Promise<User[]> {
  return getAllUsers();
}

export async function findUserById(user_id: number): Promise<User | null> {
  return getUserById(user_id);
}

export async function modifyUser(
  user_id: number,
  user: Partial<Omit<User, "user_id">>
): Promise<User | null> {
  return updateUser(user_id, user);
}

export async function removeUser(user_id: number): Promise<boolean> {
  return deleteUser(user_id);
}
