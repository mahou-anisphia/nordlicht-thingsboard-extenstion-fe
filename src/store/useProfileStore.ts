import { create } from "zustand";
import { Profile } from "@/types/profile";
import api from "@/utils/axios";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Profile>("/auth/profile");
      set({
        profile: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch profile",
        loading: false,
      });
    }
  },
}));

export default useProfileStore;
