import { Select, SelectItem } from "@heroui/react";
import React from "react";

const statusOptions = [
  { key: "all", label: "All Statuses" },
  { key: "Scheduled", label: "Scheduled" },
  { key: "In Progress", label: "In Progress" },
  { key: "Completed", label: "Completed" },
  { key: "Cancelled", label: "Cancelled" },
];

const sortOptions = [
  { key: "date", label: "Date" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
];

const sortOrderOptions = [
  { key: "asc", label: "Ascending" },
  { key: "desc", label: "Descending" },
];

export const Filters = ({
  sortBy,
  statusFilter,
  sortOrder,
  limit,
  handleStatusChange,
  handleSortByChange,
  handleSortOrderChange,
  handleLimitChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-48">
        <Select
          label="Status Filter"
          selectedKeys={[statusFilter]}
          onSelectionChange={(keys) => handleStatusChange(Array.from(keys)[0])}
          size="sm"
          classNames={{
            trigger: "hover:border-transparent focus:outline-none",
          }}
        >
          {statusOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex-1 min-w-32">
        <Select
          label="Sort By"
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => handleSortByChange(Array.from(keys)[0])}
          size="sm"
          classNames={{
            trigger: "hover:border-transparent focus:outline-none",
          }}
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex-1 min-w-32">
        <Select
          label="Order"
          selectedKeys={[sortOrder]}
          onSelectionChange={(keys) =>
            handleSortOrderChange(Array.from(keys)[0])
          }
          size="sm"
          classNames={{
            trigger: "hover:border-transparent focus:outline-none",
          }}
        >
          {sortOrderOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex-1 min-w-24">
        <Select
          label="Per Page"
          selectedKeys={[limit.toString()]}
          onSelectionChange={(keys) => handleLimitChange(Array.from(keys)[0])}
          size="sm"
          classNames={{
            trigger: "hover:border-transparent focus:outline-none",
          }}
        >
          <SelectItem key="5">5</SelectItem>
          <SelectItem key="10">10</SelectItem>
          <SelectItem key="25">25</SelectItem>
          <SelectItem key="50">50</SelectItem>
        </Select>
      </div>
    </div>
  );
};
