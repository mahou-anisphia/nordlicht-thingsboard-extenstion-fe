export interface DeviceProfile {
  id: string;
  name: string;
  type: string;
  description: string;
  is_default: boolean;
  transport_type: string;
  provision_type: string;
  created_time: string;
}

export interface ProfileCounts {
  total_profiles: number;
  total_devices: number;
}

export interface DeviceProfileState {
  deviceProfiles: DeviceProfile[];
  loading: boolean;
  error: string | null;
  counts: ProfileCounts | null;
  fetchDeviceProfiles: () => Promise<void>;
  fetchCounts: () => Promise<void>;
}

export interface DeviceProfileResponse {
  data: DeviceProfile[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
