"use client";

import { api } from "@/services/api/api";
import router from "next/router";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

type User = {
  id: string;
  email: string;
  name: string;
  // adicione outros campos se necessário
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user || data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }

    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      if (!ignore) {
        await checkAuth();
      }
    }

    void loadUser();

    return () => {
      ignore = true;
    };
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
