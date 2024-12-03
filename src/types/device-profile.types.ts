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
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DeviceProfileResponse {
  profiles: DeviceProfile[];
  pagination: PaginationMeta;
}
