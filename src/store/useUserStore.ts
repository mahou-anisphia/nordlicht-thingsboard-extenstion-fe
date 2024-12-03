// stores/useUserStore.ts
import { create } from "zustand";
import { UserState } from "../types/users";
import api from "../utils/axios";

const useUserStore = create<UserState>((set) => ({
  users: [],
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  },
  counts: 0,
  loading: false,
  error: null,

  fetchUsers: async (page = 1, pageSize = 10) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(
        `/auth/users?pageNumber=${page}&pageSize=${pageSize}`
      );
      set({
        users: response.data.users,
        pagination: response.data.pagination,
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch users";
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  fetchCounts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/auth/users/count");
      set({
        counts: response.data.count,
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user count";
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },
}));

export default useUserStore;
