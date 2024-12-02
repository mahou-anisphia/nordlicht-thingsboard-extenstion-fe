// stores/useDeviceProfileStore.ts
import { create } from "zustand";
import {
  DeviceProfileState,
  DeviceProfileResponse,
  DeviceProfile,
} from "../types/device-profile.types";
import api from "../utils/axios";

const defaultPagination = {
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
};

interface ProfileCounts {
  total_profiles: number;
  total_devices: number;
}

const useDeviceProfileStore = create<
  DeviceProfileState & {
    pagination: typeof defaultPagination;
    counts: ProfileCounts | null;
    fetchDeviceProfiles: () => Promise<void>;
    fetchCounts: () => Promise<void>;
    setPage: (page: number, pageSize: number) => void;
  }
>((set, get) => ({
  deviceProfiles: [],
  loading: false,
  error: null,
  pagination: defaultPagination,
  counts: null,

  fetchDeviceProfiles: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<DeviceProfile[]>("/device-profiles");
      const profiles = response.data;

      set((state) => ({
        deviceProfiles: profiles,
        pagination: {
          ...state.pagination,
          total: profiles.length,
          totalPages: Math.ceil(profiles.length / state.pagination.pageSize),
        },
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch device profiles",
        loading: false,
      });
    }
  },

  setPage: (page: number, pageSize: number) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        page,
        pageSize,
        totalPages: Math.ceil(state.deviceProfiles.length / pageSize),
      },
    }));
  },

  fetchCounts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<ProfileCounts>("/device-profiles/count");
      set({
        counts: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch profile counts",
        loading: false,
      });
    }
  },
}));

export default useDeviceProfileStore;
