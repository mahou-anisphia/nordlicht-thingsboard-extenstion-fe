import React from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

interface DeviceFiltersProps {
  uniqueTypes: Array<{ type: string; count: number }>;
  onSearch: (value: string) => void;
  onTypeChange: (value: string) => void;
  getTypeLabel: (type: string) => string;
}

export const DeviceFilters: React.FC<DeviceFiltersProps> = ({
  uniqueTypes,
  onSearch,
  onTypeChange,
  getTypeLabel,
}) => (
  <div className="flex flex-wrap items-center gap-4 mb-4">
    <Search
      placeholder="Search devices..."
      onSearch={onSearch}
      className="max-w-md"
      allowClear
    />
    <Select
      placeholder="Filter by type"
      onChange={onTypeChange}
      allowClear
      className="min-w-[200px]"
    >
      {uniqueTypes.map((type) => (
        <Option key={type.type} value={type.type}>
          {getTypeLabel(type.type)} ({type.count})
        </Option>
      ))}
    </Select>
  </div>
);
