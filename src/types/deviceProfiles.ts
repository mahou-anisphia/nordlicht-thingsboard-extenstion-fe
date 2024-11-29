// types/deviceProfiles.ts
export interface DeviceProfile {
  id: string;
  name: string;
  type: string;
  is_default: boolean;
  device_count: number;
}

export interface DeviceProfileCountResponse {
  total_profiles: number;
  total_devices: number;
  profiles: DeviceProfile[];
}

export interface DeviceProfileState {
  counts: DeviceProfileCountResponse | null;
  isLoading: boolean;
  error: string | null;
}
