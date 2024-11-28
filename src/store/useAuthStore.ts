// store/useAuthStore.ts
import { create } from "zustand";
import axios from "axios";
import { AuthState, LoginCredentials, LoginResponse } from "../types/auth";

const API_URL = "http://localhost:50060/api/v1";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`,
        credentials
      );

      const { access_token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

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
    delete axios.defaults.headers.common["Authorization"];
    set({
      user: null,
      error: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
