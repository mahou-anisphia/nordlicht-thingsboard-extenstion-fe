import React from "react";
import { Table, Space, Checkbox, Typography, Tooltip, Tag } from "antd";
import {
  formatUnixTimestamp,
  formatPartitionTimestamp,
} from "@/utils/dateUtils";
import { TelemetryKey, TelemetryData } from "@/types/device-telemetry";

const { Text } = Typography;

interface TelemetryTableProps {
  loading: boolean;
  telemetryKeys: TelemetryKey[];
  latestTelemetry: TelemetryData[];
  selectedKeys: string[];
  selectedPartitions: Array<{ key: string; partition: string }>;
  onKeySelect: (key: string, checked: boolean) => void;
  onTogglePartition: (key: string, partition: string) => void;
  onSelectAllPartitionsForKey: (key: string, checked: boolean) => void;
}

const TelemetryTable: React.FC<TelemetryTableProps> = ({
  loading,
  telemetryKeys,
  latestTelemetry,
  selectedKeys,
  selectedPartitions,
  onKeySelect,
  onTogglePartition,
  onSelectAllPartitionsForKey,
}) => {
  const expandedRowRender = (record: { key: string }) => {
    const telemetryKey = telemetryKeys.find((tk) => tk.key === record.key);
    if (!telemetryKey) return null;

    const isKeySelected = selectedKeys.includes(record.key);
    const allPartitionsSelected = telemetryKey.partitions.every((partition) =>
      selectedPartitions.some(
        (p) => p.key === record.key && p.partition === partition
      )
    );
    const somePartitionsSelected = telemetryKey.partitions.some((partition) =>
      selectedPartitions.some(
        (p) => p.key === record.key && p.partition === partition
      )
    );

    return (
      <div className="pl-8">
        <div className="flex items-center mb-2">
          <Text type="secondary" className="mr-2">
            Available Partitions
          </Text>
          <Tooltip
            title={
              !isKeySelected
                ? "Select the key first to enable partition selection"
                : ""
            }
          >
            <div>
              <Checkbox
                checked={allPartitionsSelected}
                indeterminate={!allPartitionsSelected && somePartitionsSelected}
                onChange={(e) =>
                  onSelectAllPartitionsForKey(record.key, e.target.checked)
                }
                disabled={!isKeySelected}
              >
                Select All Partitions
              </Checkbox>
            </div>
          </Tooltip>
        </div>
        <Space size={[0, 8]} wrap>
          {telemetryKey.partitions.map((partition) => {
            const isSelected = selectedPartitions.some(
              (p) => p.key === record.key && p.partition === partition
            );
            return (
              <Tooltip
                key={partition}
                title={
                  !isKeySelected
                    ? "Select the key first to enable partition selection"
                    : ""
                }
              >
                <Tag
                  color={isSelected ? "blue" : "default"}
                  style={{
                    cursor: isKeySelected ? "pointer" : "not-allowed",
                    opacity: isKeySelected ? 1 : 0.5,
                  }}
                  onClick={() =>
                    isKeySelected && onTogglePartition(record.key, partition)
                  }
                >
                  <Space>
                    <Checkbox checked={isSelected} disabled={!isKeySelected} />
                    {formatPartitionTimestamp(partition)}
                  </Space>
                </Tag>
              </Tooltip>
            );
          })}
        </Space>
      </div>
    );
  };

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      render: (key: string) => (
        <Space>
          <Checkbox
            checked={selectedKeys.includes(key)}
            onChange={(e) => onKeySelect(key, e.target.checked)}
          />
          <Text>{key}</Text>
        </Space>
      ),
    },
    {
      title: "Latest Value",
      dataIndex: "value",
      key: "value",
      render: (value: string | number | boolean) => (
        <Text>{value.toString()}</Text>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "ts",
      key: "ts",
      render: (ts: number) => <Text>{formatUnixTimestamp(ts)}</Text>,
    },
  ];

  return (
    <Table
      dataSource={latestTelemetry}
      columns={columns}
      rowKey="key"
      loading={loading}
      pagination={false}
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => {
          const telemetryKey = telemetryKeys.find(
            (tk) => tk.key === record.key
          );
          return Boolean(telemetryKey?.partitions?.length);
        },
      }}
    />
  );
};

export default TelemetryTable;
