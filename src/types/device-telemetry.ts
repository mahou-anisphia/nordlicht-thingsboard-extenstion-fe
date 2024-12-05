export interface TelemetryKey {
  key: string;
  partitions: string[];
}

export interface TelemetryData {
  key: string;
  value: string | number | boolean;
  ts: number;
}
