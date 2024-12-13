export interface TelemetryKey {
  key: string;
  partitions: string[];
  lastValue: number | null;
  timestamp: string | null;
}

export interface TelemetryData {
  key: string;
  value: string | number | boolean;
  ts: number;
}

export interface SelectedPartition {
  key: string;
  partition: string;
}

export interface LatestTelemetryResponse {
  telemetry: TelemetryData[];
}

export interface DeviceTelemetryState {
  telemetryKeys: TelemetryKey[];
  latestTelemetry: TelemetryData[];
  loading: boolean;
  error: string | null;
  selectedKeys: string[];
  selectedPartitions: SelectedPartition[];
}

export enum CsvDelimiter {
  COMMA = ",",
  SEMICOLON = ";",
  TAB = "\t",
  PIPE = "|",
}

export enum Compression {
  NONE = "none",
  ZIP = "zip",
}

export interface ExportConfig {
  fileFormat: "csv" | "json" | "xlsx";
  timeFormat: "iso" | "unix" | "human" | "relative";
  dataOrganization: "key" | "partition" | "flat";
  includeMetadata: boolean;
  nullValueHandling: "empty" | "null" | "custom" | "skip";
  csvDelimiter?: CsvDelimiter;
  compression: Compression;
  customNullValue?: string;
}
