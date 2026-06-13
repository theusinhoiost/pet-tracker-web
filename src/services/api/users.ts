import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from "@/types/zod/create-account";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();

  return cookieStore.get("access_token")?.value;
}

export async function createUser(data: CreateUserDto) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
export async function updateUserPassword(data: UpdatePasswordDto) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateUser(data: UpdateUserDto) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
