import React, { useState } from "react";
import {
  Modal,
  Form,
  Radio,
  Select,
  Switch,
  Divider,
  Table,
  Typography,
  Tag,
  Space,
  Card,
  Input,
} from "antd";
import { formatPartitionTimestamp } from "@/utils/dateUtils";
import useDeviceTelemetryStore from "@/store/useDeviceTelemetryStore";
import {
  ExportConfig,
  CsvDelimiter,
  Compression,
} from "@/types/device-telemetry";

const { Text, Title } = Typography;

interface ExportConfigModalProps {
  isVisible: boolean;
  exportMode: "selected" | "all";
  onOk: (values: ExportConfig) => void;
  onCancel: () => void;
}

interface DataOrganizationExample {
  columns: { title: string; dataIndex: string; key: string }[];
  data: Record<string, any>[];
  description: string;
}

const DataOrganizationPreview: React.FC<{
  format: ExportConfig["dataOrganization"];
}> = ({ format }) => {
  const examples: Record<
    ExportConfig["dataOrganization"],
    DataOrganizationExample
  > = {
    key: {
      description:
        "Each row represents a timestamp with all sensor readings. Best for analyzing trends over time.",
      columns: [
        { title: "Key", dataIndex: "key", key: "key" },
        { title: "Partition", dataIndex: "partition", key: "partition" },
        { title: "Value", dataIndex: "value", key: "value" },
        { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
      ],
      data: [
        {
          key: "temperature",
          partition: "2024-02-20-15",
          value: "23.5",
          timestamp: "2024-02-20T15:00:00Z",
        },
        {
          key: "temperature",
          partition: "2024-02-20-16",
          value: "24.1",
          timestamp: "2024-02-20T16:00:00Z",
        },
        {
          key: "humidity",
          partition: "2024-02-20-15",
          value: "45",
          timestamp: "2024-02-20T15:00:00Z",
        },
        {
          key: "humidity",
          partition: "2024-02-20-16",
          value: "47",
          timestamp: "2024-02-20T16:00:00Z",
        },
      ],
    },
    partition: {
      description:
        "Data grouped by time partition. Perfect for analyzing all metrics at specific timestamps.",
      columns: [
        { title: "Partition", dataIndex: "partition", key: "partition" },
        { title: "Temperature", dataIndex: "temperature", key: "temperature" },
        { title: "Humidity", dataIndex: "humidity", key: "humidity" },
        { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
      ],
      data: [
        {
          partition: "2024-02-20-15",
          temperature: "23.5",
          humidity: "45",
          timestamp: "2024-02-20T15:00:00Z",
        },
        {
          partition: "2024-02-20-16",
          temperature: "24.1",
          humidity: "47",
          timestamp: "2024-02-20T16:00:00Z",
        },
      ],
    },
    flat: {
      description:
        "Each row represents a single measurement. Ideal for data analysis tools and database imports.",
      columns: [
        { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
        { title: "Key", dataIndex: "key", key: "key" },
        { title: "Value", dataIndex: "value", key: "value" },
        { title: "Partition", dataIndex: "partition", key: "partition" },
      ],
      data: [
        {
          timestamp: "2024-02-20T15:00:00Z",
          key: "temperature",
          value: "23.5",
          partition: "2024-02-20-15",
        },
        {
          timestamp: "2024-02-20T15:00:00Z",
          key: "humidity",
          value: "45",
          partition: "2024-02-20-15",
        },
        {
          timestamp: "2024-02-20T16:00:00Z",
          key: "temperature",
          value: "24.1",
          partition: "2024-02-20-16",
        },
        {
          timestamp: "2024-02-20T16:00:00Z",
          key: "humidity",
          value: "47",
          partition: "2024-02-20-16",
        },
      ],
    },
  };

  const example = examples[format];

  return (
    <Card size="small" className="bg-gray-50 mt-4">
      <Text type="secondary" className="block mb-3">
        {example.description}
      </Text>
      <Table
        key={format}
        dataSource={example.data}
        columns={example.columns}
        pagination={false}
        size="small"
        className="format-preview-table"
        rowKey={(record, index) => `${format}-${index}`}
      />
    </Card>
  );
};

const ExportConfigModal: React.FC<ExportConfigModalProps> = ({
  isVisible,
  exportMode,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm<ExportConfig>();
  const { telemetryKeys, selectedKeys, selectedPartitions } =
    useDeviceTelemetryStore();
  const [selectedFormat, setSelectedFormat] =
    useState<ExportConfig["dataOrganization"]>("key");

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  // Preview table setup for selected data
  const groupedPartitions = selectedPartitions.reduce((acc, curr) => {
    if (!acc[curr.key]) acc[curr.key] = [];
    acc[curr.key].push(curr.partition);
    return acc;
  }, {} as Record<string, string[]>);

  const previewData = (
    exportMode === "all" ? telemetryKeys.map((tk) => tk.key) : selectedKeys
  ).map((key) => {
    const telemetryKey = telemetryKeys.find((tk) => tk.key === key);
    return {
      key,
      partitions:
        exportMode === "all"
          ? telemetryKey?.partitions || []
          : groupedPartitions[key] || [],
      totalPartitions:
        exportMode === "all"
          ? telemetryKey?.partitions?.length || 0
          : groupedPartitions[key]?.length || 0,
    };
  });

  const previewColumns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      render: (text: string) => (
        <Text strong className="text-gray-800">
          {text}
        </Text>
      ),
    },
    {
      title: "Selected Partitions",
      dataIndex: "partitions",
      key: "partitions",
      render: (partitions: string[]) => (
        <Space size={[0, 4]} wrap>
          {partitions.map((partition, index) => (
            <Tag key={index} color="blue" className="px-2 py-1 rounded">
              {formatPartitionTimestamp(partition)}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Total Partitions",
      dataIndex: "totalPartitions",
      key: "totalPartitions",
      width: 140,
      render: (total: number) => <Text className="text-gray-600">{total}</Text>,
    },
  ];

  return (
    <Modal
      title={
        <Title level={4} className="mb-0">
          {exportMode === "selected"
            ? "Export Selected Telemetry Data"
            : "Export All Telemetry Data"}
        </Title>
      }
      open={isVisible}
      onOk={handleOk}
      onCancel={onCancel}
      width={800}
      className="export-config-modal"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fileFormat: "csv",
          timeFormat: "human",
          dataOrganization: "key",
          includeMetadata: true,
          nullValueHandling: "empty",
          csvDelimiter: CsvDelimiter.COMMA,
          compression: Compression.NONE,
        }}
      >
        {/* File Format Selection */}
        <Form.Item
          name="fileFormat"
          label="File Format"
          tooltip="Choose the format of the exported file"
        >
          <Radio.Group>
            <Radio.Button value="csv">CSV</Radio.Button>
            <Radio.Button value="json">JSON</Radio.Button>
            <Radio.Button value="excel">Excel</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Data Organization Selection with Preview */}
        <Form.Item
          name="dataOrganization"
          label="Data Organization"
          tooltip="Choose how the data should be structured in the export file"
        >
          <div className="space-y-4">
            <Radio.Group
              onChange={(e) => setSelectedFormat(e.target.value)}
              value={selectedFormat}
            >
              <Radio.Button value="key">Group by Key</Radio.Button>
              <Radio.Button value="partition">Group by Partition</Radio.Button>
              <Radio.Button value="flat">Flat Structure</Radio.Button>
            </Radio.Group>
            <DataOrganizationPreview format={selectedFormat} />
          </div>
        </Form.Item>

        <Form.Item
          name="timeFormat"
          label="Time Format"
          tooltip="Select how timestamps should be formatted in the export"
        >
          <Select>
            <Select.Option value="human">
              Human Readable (Feb 20, 2024 15:30:00)
            </Select.Option>
            <Select.Option value="iso">
              ISO 8601 (2024-02-20T15:30:00Z)
            </Select.Option>
            <Select.Option value="unix">
              UNIX Timestamp (1708444200)
            </Select.Option>
            <Select.Option value="relative">
              Relative Time (2 hours ago)
            </Select.Option>
          </Select>
        </Form.Item>

        <Divider />

        <Form.Item
          name="includeMetadata"
          label="Include Metadata"
          tooltip="Include additional information about the data source and export time"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="nullValueHandling"
          label="Null Value Handling"
          tooltip="Specify how null or missing values should be represented"
        >
          <Select
            onChange={(value) =>
              form.setFieldsValue({
                nullCustomValue: value === "custom" ? "" : undefined,
              })
            }
          >
            <Select.Option value="empty">Empty String</Select.Option>
            <Select.Option value="null">NULL</Select.Option>
            <Select.Option value="custom">Custom Value</Select.Option>
            <Select.Option value="skip">Skip Row</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.nullValueHandling !== currentValues.nullValueHandling
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("nullValueHandling") === "custom" && (
              <Form.Item
                name="nullCustomValue"
                label="Custom Null Value"
                tooltip="Enter the custom value to use for null/missing values"
              >
                <Input placeholder="Enter custom value" />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.fileFormat !== currentValues.fileFormat
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("fileFormat") === "csv" && (
              <Form.Item
                name="csvDelimiter"
                label="CSV Delimiter"
                tooltip="Choose the delimiter for CSV format"
              >
                <Select>
                  <Select.Option value={CsvDelimiter.COMMA}>
                    Comma (,)
                  </Select.Option>
                  <Select.Option value={CsvDelimiter.SEMICOLON}>
                    Semicolon (;)
                  </Select.Option>
                  <Select.Option value={CsvDelimiter.TAB}>Tab</Select.Option>
                  <Select.Option value={CsvDelimiter.PIPE}>
                    Pipe (|)
                  </Select.Option>
                </Select>
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item
          name="compression"
          label="Compression"
          tooltip="Choose if and how the export should be compressed"
        >
          <Select>
            <Select.Option value={Compression.NONE}>None</Select.Option>
            <Select.Option value={Compression.ZIP}>ZIP</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      {/* Selected Data Preview */}
      <Card className="mb-6 shadow-sm">
        <Title level={5} className="mb-4">
          Selected Data Preview
        </Title>
        <Table
          dataSource={previewData}
          columns={previewColumns}
          size="small"
          pagination={false}
          className="preview-table"
        />
      </Card>
    </Modal>
  );
};

export default ExportConfigModal;
