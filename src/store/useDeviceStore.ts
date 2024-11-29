// store/useDeviceStore.ts

import { create } from "zustand";
import { DeviceState, DeviceResponse } from "@/types/devices";
import api from "../utils/axios";

const defaultPagination = {
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
};

const useDeviceStore = create<
  DeviceState & {
    fetchDevices: (
      page?: number,
      pageSize?: number,
      filters?: Record<string, any>
    ) => Promise<void>;
    fetchCounts: () => Promise<void>;
  }
>((set) => ({
  devices: [],
  counts: null,
  pagination: defaultPagination,
  isLoading: false,
  error: null,

  fetchDevices: async (page = 1, pageSize = 10, filters = {}) => {
    try {
      set({ isLoading: true, error: null });
      const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: pageSize.toString(),
        ...filters,
      });

      const response = await api.get<DeviceResponse>(`/devices?${params}`);

      set({
        devices: response.data.data,
        pagination: response.data.meta,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch devices",
        isLoading: false,
      });
    }
  },

  fetchCounts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/devices/count");
      set({
        counts: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch device counts",
        isLoading: false,
      });
    }
  },
}));

export default useDeviceStore;
