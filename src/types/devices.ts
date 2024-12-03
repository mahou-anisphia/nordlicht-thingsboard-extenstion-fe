// types/device.ts

export interface DeviceProfile {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string | null;
  default_dashboard_id: string | null;
}

export interface Device {
  id: string;
  name: string;
  label: string | null;
  type: string;
  created_time: string;
  customer_id: string;
  device_profile: DeviceProfile;
}

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

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DeviceResponse {
  data: Device[];
  meta: PaginationMeta;
}

export interface DeviceState {
  devices: Device[];
  counts: DeviceCountResponse | null;
  pagination: PaginationMeta;
  loading: boolean;
  error: string | null;
}
