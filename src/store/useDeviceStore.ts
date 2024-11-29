// stores/useDeviceStore.ts
import { create } from "zustand";
import { DeviceState } from "../types/devices";
import api from "../utils/axios";

const useDeviceStore = create<DeviceState>((set) => ({
  counts: null,
  isLoading: false,
  error: null,

  fetchCounts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/devices/count");
      set({
        counts: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch device counts",
        isLoading: false,
      });
    }
  },
}));

export default useDeviceStore;
