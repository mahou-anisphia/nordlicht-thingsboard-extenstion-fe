import React, { useEffect } from "react";
import { Card, Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useDeviceTelemetryStore from "@/store/useDeviceTelemetryStore";
import DeviceHeader from "./components/DeviceHeader";
import TelemetryActions from "./components/TelemetryActions";
import TelemetryTable from "./components/TelemetryTable";

const DeviceDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    telemetryKeys,
    latestTelemetry,
    selectedKeys,
    selectedPartitions,
    loading,
    error,
    fetchTelemetryKeys,
    fetchLatestTelemetry,
    setSelectedKeys,
    togglePartition,
    selectAllPartitionsForKey,
    selectAll,
  } = useDeviceTelemetryStore();

  useEffect(() => {
    if (id) {
      fetchTelemetryKeys(id);
      fetchLatestTelemetry(id);
    }
  }, [id, fetchTelemetryKeys, fetchLatestTelemetry]);

  const handleBack = () => navigate(-1);

  const handleKeySelect = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedKeys([...selectedKeys, key]);
    } else {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    }
  };

  const handleExportSelected = () => {
    console.log("Exporting selected keys:", selectedKeys);
    console.log("Exporting selected partitions:", selectedPartitions);
  };

  const handleExportAll = () => {
    console.log("Exporting all keys and partitions");
  };

  const handleRefreshTelemetry = () => {
    if (id) {
      fetchLatestTelemetry(id);
    }
  };

  const allSelected =
    telemetryKeys.length > 0 &&
    selectedKeys.length === telemetryKeys.length &&
    telemetryKeys.every((tk) =>
      tk.partitions.every((partition) =>
        selectedPartitions.some(
          (sp) => sp.key === tk.key && sp.partition === partition
        )
      )
    );

  const someSelected = selectedKeys.length > 0 || selectedPartitions.length > 0;

  return (
    <div className="p-6">
      <Card className="shadow-sm">
        <DeviceHeader id={id || ""} onBack={handleBack} />

        {error && <Alert type="error" message={error} className="mb-4" />}

        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium m-0">Telemetry Data</h5>
            <TelemetryActions
              loading={loading}
              someSelected={someSelected}
              allSelected={allSelected}
              selectedKeys={selectedKeys}
              selectedPartitions={selectedPartitions}
              onRefresh={handleRefreshTelemetry}
              onExportSelected={handleExportSelected}
              onExportAll={handleExportAll}
              onSelectAll={selectAll}
            />
          </div>

          <TelemetryTable
            loading={loading}
            telemetryKeys={telemetryKeys}
            latestTelemetry={latestTelemetry}
            selectedKeys={selectedKeys}
            selectedPartitions={selectedPartitions}
            onKeySelect={handleKeySelect}
            onTogglePartition={togglePartition}
            onSelectAllPartitionsForKey={selectAllPartitionsForKey}
          />
        </div>
      </Card>
    </div>
  );
};

export default DeviceDetailPage;
