import React, { useState } from "react";
import { Button, Space, Checkbox, Tooltip } from "antd";
import { ExportOutlined, ReloadOutlined } from "@ant-design/icons";
import ExportConfigModal, { ExportConfig } from "./ExportConfigModal";
import useDeviceTelemetryStore from "@/store/useDeviceTelemetryStore";

interface TelemetryActionsProps {
  loading: boolean;
  someSelected: boolean;
  allSelected: boolean;
  onRefresh: () => void;
  onExportSelected: () => void;
  onSelectAll: (checked: boolean) => void;
}

const TelemetryActions: React.FC<TelemetryActionsProps> = ({
  loading,
  someSelected,
  allSelected,
  onRefresh,
  onExportSelected,
  onSelectAll,
}) => {
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const { selectedKeys, selectedPartitions } = useDeviceTelemetryStore();
  const hasSelectedPartitions = selectedPartitions.length > 0;

  const showExportModal = (mode: "selected" | "all") => {
    if (mode === "all") {
      // For "Export All", first select everything, then show modal
      onSelectAll(true);
      // Use setTimeout to ensure the selection is complete before showing modal
      setTimeout(() => {
        setIsExportModalVisible(true);
      }, 100);
    } else {
      setIsExportModalVisible(true);
    }
  };

  const handleExport = (values: ExportConfig) => {
    console.log("Export configuration:", values);
    onExportSelected();
    setIsExportModalVisible(false);
  };

  return (
    <>
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
              onClick={() => showExportModal("selected")}
              disabled={!hasSelectedPartitions}
            >
              Export Selected (
              {selectedKeys.length > 0 ? `${selectedKeys.length} keys, ` : ""}
              {selectedPartitions.length} partitions)
            </Button>
          </Tooltip>
        )}
        <Button
          icon={<ExportOutlined />}
          onClick={() => showExportModal("all")}
        >
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

      <ExportConfigModal
        isVisible={isExportModalVisible}
        exportMode={allSelected ? "all" : "selected"}
        onOk={handleExport}
        onCancel={() => setIsExportModalVisible(false)}
      />
    </>
  );
};

export default TelemetryActions;
