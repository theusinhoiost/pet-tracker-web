import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from "@/types/zod/accounts";
import { serverFetch } from "../auth/server";

export async function createUser(data: CreateUserDto) {
  const response = await serverFetch(`/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
export async function updateUserPassword(data: UpdatePasswordDto) {
  const response = await serverFetch("/user/me/password", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateUser(data: UpdateUserDto) {
  const response = await serverFetch("/user/me", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
}
