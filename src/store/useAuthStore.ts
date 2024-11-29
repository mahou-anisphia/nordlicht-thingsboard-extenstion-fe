import { create } from "zustand";
import { AuthState, LoginCredentials, LoginResponse } from "../types/auth";
import api from "../utils/axios";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Rehydrate state from localStorage
  rehydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      set({
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },

  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      const { access_token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Invalid credentials",
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      user: null,
      error: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
