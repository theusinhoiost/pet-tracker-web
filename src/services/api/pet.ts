// src/lib/api/pet.ts
import { CreatePetDto } from "@/types/zod/pets";
import { serverFetch } from "../auth/server";

export async function createPet(data: CreatePetDto | FormData) {
  const response = await serverFetch("/pet", {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers:
      data instanceof FormData
        ? undefined
        : { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.text();

    console.error("Status:", response.status);
    console.error("Response:", error);

    throw new Error(error);
  }

  return response.json();
}

export async function getPetById(id: string) {
  const response = await serverFetch(`/pet/${id}`, { method: "GET" });
  return response.json();
}

export async function getAllPets() {
  const response = await serverFetch("/pet", { method: "GET" });
  return response.json();
}

export async function deletePet(id: string) {
  await serverFetch(`/pet/${id}`, { method: "DELETE" });
}
