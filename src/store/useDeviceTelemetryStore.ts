import { create } from "zustand";
import {
  DeviceTelemetryState,
  TelemetryKey,
  LatestTelemetryResponse,
  SelectedPartition,
} from "@/types/device-telemetry";
import api from "../utils/axios";

const useDeviceTelemetryStore = create<
  DeviceTelemetryState & {
    fetchTelemetryKeys: (deviceId: string) => Promise<void>;
    fetchPartitions: (deviceId: string, keys: string[]) => Promise<void>;
    fetchLatestTelemetry: (deviceId: string) => Promise<void>;
    setSelectedKeys: (keys: string[]) => void;
    setSelectedPartitions: (partitions: SelectedPartition[]) => void;
    togglePartition: (key: string, partition: string) => void;
    selectAllPartitionsForKey: (key: string, selected: boolean) => void;
    selectAll: (selected: boolean) => void;
  }
>((set) => ({
  telemetryKeys: [],
  latestTelemetry: [],
  loading: false,
  error: null,
  selectedKeys: [],
  selectedPartitions: [],

  fetchTelemetryKeys: async (deviceId: string) => {
    try {
      set({ loading: true, error: null });

      // First, get available keys
      const keysResponse = await api.get(`/devices/${deviceId}/telemetry-keys`);
      const keys = keysResponse.data.keys;

      // Then, get partitions for all keys
      const partitionsResponse = await api.get(
        `/devices/${deviceId}/partitions?keys=${keys.join(",")}`
      );

      // Transform the data into our desired format
      const telemetryKeys: TelemetryKey[] = keys.map((key: string) => {
        const keyPartitions = partitionsResponse.data.partitions
          .filter((p: { key: string }) => p.key === key)
          .map((p: { partition: string }) => p.partition);

        return {
          key,
          partitions: keyPartitions,
          lastValue: null,
          timestamp: null,
        };
      });

      set({ telemetryKeys, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch telemetry data";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchLatestTelemetry: async (deviceId: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<LatestTelemetryResponse>(
        `/devices/${deviceId}/latest-telemetry`
      );

      set({
        latestTelemetry: response.data.telemetry,
        loading: false,
      });

      // Update lastValue and timestamp in telemetryKeys
      set((state) => ({
        telemetryKeys: state.telemetryKeys.map((key) => {
          const latestData = response.data.telemetry.find(
            (t) => t.key === key.key
          );
          if (latestData) {
            return {
              ...key,
              lastValue:
                typeof latestData.value === "number" ? latestData.value : null,
              timestamp: new Date(latestData.ts).toISOString(),
            };
          }
          return key;
        }),
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch latest telemetry";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchPartitions: async (deviceId: string, keys: string[]) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(
        `/devices/${deviceId}/partitions?keys=${keys.join(",")}`
      );

      // Update the partitions for the selected keys
      set((state) => ({
        telemetryKeys: state.telemetryKeys.map((key) => ({
          ...key,
          partitions: response.data.partitions
            .filter((p: { key: string }) => p.key === key.key)
            .map((p: { partition: string }) => p.partition),
        })),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch partitions";
      set({ error: errorMessage, loading: false });
    }
  },

  setSelectedKeys: (keys: string[]) => {
    set((state) => {
      // When deselecting keys, remove their partitions as well
      const removedKeys = state.selectedKeys.filter((k) => !keys.includes(k));
      const updatedPartitions = state.selectedPartitions.filter(
        (p) => !removedKeys.includes(p.key)
      );

      return {
        selectedKeys: keys,
        selectedPartitions: updatedPartitions,
      };
    });
  },

  setSelectedPartitions: (partitions: SelectedPartition[]) => {
    set((state) => ({
      selectedPartitions: partitions.filter((p) =>
        state.selectedKeys.includes(p.key)
      ),
    }));
  },

  togglePartition: (key: string, partition: string) => {
    set((state) => {
      // Only allow toggling if the key is selected
      if (!state.selectedKeys.includes(key)) {
        return state;
      }

      const existingIndex = state.selectedPartitions.findIndex(
        (p) => p.key === key && p.partition === partition
      );

      if (existingIndex >= 0) {
        // Remove if already selected
        return {
          selectedPartitions: state.selectedPartitions.filter(
            (_, index) => index !== existingIndex
          ),
        };
      } else {
        // Add if not selected
        return {
          selectedPartitions: [...state.selectedPartitions, { key, partition }],
        };
      }
    });
  },

  selectAllPartitionsForKey: (key: string, selected: boolean) => {
    set((state) => {
      // Only allow selecting partitions if the key is selected
      if (!state.selectedKeys.includes(key)) {
        return state;
      }

      const telemetryKey = state.telemetryKeys.find((tk) => tk.key === key);
      if (!telemetryKey) return state;

      if (selected) {
        // Add all partitions for this key
        const newPartitions = telemetryKey.partitions
          .filter(
            (partition) =>
              !state.selectedPartitions.some(
                (p) => p.key === key && p.partition === partition
              )
          )
          .map((partition) => ({ key, partition }));

        return {
          selectedPartitions: [...state.selectedPartitions, ...newPartitions],
        };
      } else {
        // Remove all partitions for this key
        return {
          selectedPartitions: state.selectedPartitions.filter(
            (p) => p.key !== key
          ),
        };
      }
    });
  },

  selectAll: (selected: boolean) => {
    set((state) => {
      if (selected) {
        // Select all keys and their partitions
        const allKeys = state.telemetryKeys.map((tk) => tk.key);
        const allPartitions = state.telemetryKeys.flatMap((tk) =>
          tk.partitions.map((partition) => ({
            key: tk.key,
            partition,
          }))
        );

        return {
          selectedKeys: allKeys,
          selectedPartitions: allPartitions,
        };
      } else {
        // Deselect everything
        return {
          selectedKeys: [],
          selectedPartitions: [],
        };
      }
    });
  },
}));

export default useDeviceTelemetryStore;
