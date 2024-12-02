import { create } from "zustand";
import { Profile } from "@/types/profile";
import api from "@/utils/axios";

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<Profile>("/auth/profile");
      set({
        profile: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch profile",
        isLoading: false,
      });
    }
  },
}));

export default useProfileStore;
