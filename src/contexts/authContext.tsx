import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
  register: async () => ({ success: false }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL!;

  // Fetch user from server
  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/me`, {
        credentials: "include",
      });
      console.log("reset", res);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login API response status:", res.status);
      const responseBody = await res.json().catch(() => null);
      console.log("Login API response body:", responseBody);

      if (!res.ok) {
        console.error("Login failed:", responseBody?.message || "Unknown error");
        return false;
      }

      await fetchUser();
      return true;
    } catch (error) {
      console.error("An error occurred during login:", error);
      return false;
    }
  };

  // Register
  const register = async (email: string, password: string, name: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Registration failed:",
          errorData.message || "Unknown error"
        );
        return {
          success: false,
          message: errorData.message || "Registration failed",
        };
      }

      await fetchUser();
      return { success: true };
    } catch (error) {
      console.error("An error occurred during registration:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  // Logout
  const logout = async () => {
    await fetch(`${BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  // Call once on mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
