import { CreateLoginDto, LoginResponseDto } from "@/types/zod/login";
import { api } from "../api/api";

export const login = async (
  data: CreateLoginDto,
): Promise<LoginResponseDto> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
