// store/useDeviceStore.ts

import { create } from "zustand";
import { DeviceState, Device } from "@/types/devices";
import api from "../utils/axios";

interface DeviceResponse {
  devices: Device[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

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
      filters?: Record<string, string>
    ) => Promise<void>;
    fetchCounts: () => Promise<void>;
  }
>((set) => ({
  devices: [],
  counts: null,
  pagination: defaultPagination,
  loading: false,
  error: null,

  fetchDevices: async (page = 1, pageSize = 10, filters = {}) => {
    try {
      set({ loading: true, error: null });
      const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: pageSize.toString(),
        ...filters,
      });

      const response = await api.get<DeviceResponse>(`/devices?${params}`);

      set({
        devices: response.data.devices,
        pagination: {
          ...response.data.pagination,
          pageSize: response.data.pagination.pageSize,
        },
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch devices";
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  fetchCounts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/devices/count");
      set({
        counts: response.data,
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch device counts";
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },
}));

export default useDeviceStore;
