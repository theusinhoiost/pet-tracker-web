"use server";

import { getPetById } from "@/services/api/pet";

export async function getPetByIdAction(id: string) {
  return getPetById(id);
}
