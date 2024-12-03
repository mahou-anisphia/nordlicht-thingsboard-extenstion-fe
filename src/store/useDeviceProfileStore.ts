// stores/useDeviceProfileStore.ts
import { create } from "zustand";
import {
  DeviceProfileState,
  DeviceProfileResponse,
  PaginationMeta,
  ProfileCounts,
} from "../types/device-profile.types";
import api from "../utils/axios";

const defaultPagination: PaginationMeta = {
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
};

const useDeviceProfileStore = create<
  DeviceProfileState & {
    pagination: PaginationMeta;
    counts: ProfileCounts | null;
    fetchDeviceProfiles: (page?: number, pageSize?: number) => Promise<void>;
    fetchCounts: () => Promise<void>;
    setPage: (page: number, pageSize: number) => void;
  }
>((set) => ({
  deviceProfiles: [],
  loading: false,
  error: null,
  pagination: defaultPagination,
  counts: null,

  fetchDeviceProfiles: async (page = 1, pageSize = 10) => {
    try {
      set({ loading: true, error: null });
      const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await api.get<DeviceProfileResponse>(
        `/device-profiles?${params}`
      );

      set({
        deviceProfiles: response.data.profiles,
        pagination: response.data.pagination,
        loading: false,
      });
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
