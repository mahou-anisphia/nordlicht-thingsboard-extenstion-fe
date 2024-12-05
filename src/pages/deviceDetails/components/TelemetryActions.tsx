import React from "react";
import { Button, Space, Checkbox, Tooltip } from "antd";
import { ExportOutlined, ReloadOutlined } from "@ant-design/icons";

interface TelemetryActionsProps {
  loading: boolean;
  someSelected: boolean;
  allSelected: boolean;
  selectedKeys: string[];
  selectedPartitions: Array<{ key: string; partition: string }>;
  onRefresh: () => void;
  onExportSelected: () => void;
  onExportAll: () => void;
  onSelectAll: (checked: boolean) => void;
}

const TelemetryActions: React.FC<TelemetryActionsProps> = ({
  loading,
  someSelected,
  allSelected,
  selectedKeys,
  selectedPartitions,
  onRefresh,
  onExportSelected,
  onExportAll,
  onSelectAll,
}) => {
  const hasSelectedPartitions = selectedPartitions.length > 0;

  return (
    <Space>
      <Button icon={<ReloadOutlined />} onClick={onRefresh} loading={loading}>
        Refresh
      </Button>
      {someSelected && (
        <Tooltip
          title={
            !hasSelectedPartitions
              ? "You must select at least one partition to export"
              : ""
          }
        >
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={onExportSelected}
            disabled={!hasSelectedPartitions}
          >
            Export Selected (
            {selectedKeys.length > 0 ? `${selectedKeys.length} keys, ` : ""}
            {selectedPartitions.length} partitions)
          </Button>
        </Tooltip>
      )}
      <Button icon={<ExportOutlined />} onClick={onExportAll}>
        Export All
      </Button>
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected && !allSelected}
        onChange={(e) => onSelectAll(e.target.checked)}
      >
        Select All
      </Checkbox>
    </Space>
  );
};

export default TelemetryActions;
