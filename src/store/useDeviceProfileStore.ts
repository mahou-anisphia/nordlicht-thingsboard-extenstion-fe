// stores/useDeviceProfileStore.ts
import { create } from "zustand";
import { DeviceProfileState } from "../types/deviceProfiles";
import api from "../utils/axios";

const useDeviceProfileStore = create<DeviceProfileState>((set) => ({
  counts: null,
  isLoading: false,
  error: null,

  fetchCounts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/device-profiles/count");
      set({
        counts: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch profile counts",
        isLoading: false,
      });
    }
  },
}));

export default useDeviceProfileStore;
