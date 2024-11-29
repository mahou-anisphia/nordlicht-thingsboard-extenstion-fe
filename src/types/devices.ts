// types/devices.ts
export interface DeviceTypeCount {
  type: string;
  count: number;
}

export interface DeviceProfileCount {
  profile_id: string;
  profile_name: string;
  count: number;
}

export interface DeviceCountResponse {
  total: number;
  by_type: DeviceTypeCount[];
  by_profile: DeviceProfileCount[];
}

export interface DeviceState {
  counts: DeviceCountResponse | null;
  isLoading: boolean;
  error: string | null;
}
