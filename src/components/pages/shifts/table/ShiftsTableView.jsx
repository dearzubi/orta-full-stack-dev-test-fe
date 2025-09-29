import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useShifts } from "../../../../hooks/shift/use-shifts.js";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useUserStore } from "../../../../stores/user.store.js";
import { Error } from "./Error.jsx";
import { Filters } from "./Filters.jsx";
import { getStatusColor } from "../utils.js";

export const ShiftsTableView = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const {
    data: shiftsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useShifts({
    page,
    limit,
    status: statusFilter === "all" ? null : statusFilter,
    sortBy,
    sortOrder,
  });

  const shifts = shiftsData?.shifts || [];
  const pagination = shiftsData?.pagination || {};

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleLimitChange = (value) => {
    setLimit(parseInt(value));
    setPage(1);
  };

  const formatDate = (date) => {
    const today = dayjs();
    const shiftDate = dayjs(date);

    if (shiftDate.isSame(today, "day")) {
      return "Today";
    } else if (shiftDate.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    } else {
      return shiftDate.format("ddd, MMM D");
    }
  };

  const handleEditShift = async (shiftId) => {
    await navigate({ to: `/edit/${shiftId}` });
  };

  if (isError) {
    return <Error error={error} refetch={refetch} />;
  }

  return (
    <div className="space-y-6">
      <Filters
        sortBy={sortBy}
        sortOrder={sortOrder}
        limit={limit}
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
        handleSortByChange={handleSortByChange}
        handleSortOrderChange={handleSortOrderChange}
        handleLimitChange={handleLimitChange}
      />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Shifts
          </h2>
          <p className="text-sm text-gray-600">
            Your scheduled shifts in chronological order
          </p>
        </div>
        {pagination.totalCount !== undefined && (
          <p className="text-sm text-gray-600">
            Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
            {Math.min(
              pagination.currentPage * pagination.limit,
              pagination.totalCount,
            )}{" "}
            of {pagination.totalCount} shifts
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table
          aria-label="Shifts table"
          classNames={{
            wrapper: "shadow-none",
            th: "bg-gray-50 text-gray-700 font-semibold",
            td: "py-4",
          }}
        >
          <TableHeader>
            <TableColumn>DATE</TableColumn>
            <TableColumn>SHIFT</TableColumn>
            <TableColumn>TIME</TableColumn>
            <TableColumn>LOCATION</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>WORKER</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading shifts..." />}
            emptyContent={
              <div className="text-center py-8">
                <Icon
                  icon="heroicons:calendar-x"
                  className="w-12 h-12 text-gray-400 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No shifts found
                </h3>
                <p className="text-gray-500">
                  {statusFilter !== "all"
                    ? `No shifts found with status "${statusFilter}"`
                    : "You don't have any shifts scheduled yet."}
                </p>
              </div>
            }
          >
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {formatDate(shift.date)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {shift.title}
                    </div>
                    <div className="text-sm text-gray-500">{shift.role}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Icon
                      icon="heroicons:clock"
                      className="w-4 h-4 text-gray-400"
                    />
                    <span className="text-sm">
                      {shift.startTime} - {shift.finishTime}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex items-center space-x-1">
                      <Icon
                        icon="heroicons:map-pin"
                        className="w-4 h-4 text-gray-400"
                      />
                      <span className="font-medium text-gray-900 text-sm">
                        {shift.location.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-5">
                      {shift.location.address}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    color={getStatusColor(shift.status)}
                    size="sm"
                    variant="flat"
                    classNames={{
                      base: "px-2",
                      content: "text-xs font-medium",
                    }}
                  >
                    {shift.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div>{shift.user.name}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="primary"
                      aria-label="View shift details"
                      onPress={() => navigate({ to: `/${shift.id}` })}
                      className="hover:border-transparent focus:outline-none"
                    >
                      <Icon icon="heroicons:eye" className="w-4 h-4" />
                    </Button>
                    {shift.status === "Scheduled" && user.role === "admin" && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="warning"
                        aria-label="Edit shift"
                        onPress={() => handleEditShift(shift.id)}
                        className="hover:border-transparent focus:outline-none"
                      >
                        <Icon icon="heroicons:pencil" className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            showControls
            showShadow
            color="primary"
            size="sm"
          />
        </div>
      )}
    </div>
  );
};
