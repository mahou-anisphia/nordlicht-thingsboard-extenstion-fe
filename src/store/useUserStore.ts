// stores/useUserStore.ts
import { create } from "zustand";
import { UserState } from "../types/users";
import api from "../utils/axios";

const useUserStore = create<UserState>((set) => ({
  users: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  count: 0,
  isLoading: false,
  error: null,

  fetchUsers: async (page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(
        `/auth/users?pageNumber=${page}&pageSize=${limit}`
      );
      set({
        users: response.data.users,
        pagination: response.data.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  fetchCount: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/auth/users/count");
      set({
        count: response.data.count,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user count",
        isLoading: false,
      });
    }
  },
}));

export default useUserStore;
