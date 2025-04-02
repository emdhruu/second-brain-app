import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthState {
  user: null | { id: string; username: string };
  token: string | null;
  signup: (email: string, password: string, username: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  googleLogin: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  signup: async (username, email, password) => {
    try {
      const res = await axiosInstance.post("/auth/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      set({ token: res.data.token, user: res.data.user });
    } catch (error) {
      console.error("Signup failed", error);
    }
  },

  signin: async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      set({ token: res.data.token, user: res.data.user });
    } catch (error) {
      console.error("Signin failed", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  googleLogin: () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  },
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ user: null, token: null });
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.user, token });
    } catch (error) {
      set({ user: null, token: null });
    }
  },
}));
