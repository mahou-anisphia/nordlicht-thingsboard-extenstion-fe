// stores/useUserStore.ts
import { create } from "zustand";
import { UserState } from "../types/users";
import api from "../utils/axios";

const useUserStore = create<UserState>((set) => ({
  count: 0,
  isLoading: false,
  error: null,

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
