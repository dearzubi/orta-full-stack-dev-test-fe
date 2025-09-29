import { useState } from "react";
import { Tabs, Tab, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUserStore } from "../../../stores/user.store.js";
import { ShiftsTableView } from "./table/ShiftsTableView.jsx";
import { ShiftsCalendarView } from "./calendar/ShiftsCalendarView.jsx";
import { useNavigate } from "@tanstack/react-router";

export const ShiftsPage = () => {
  const [selectedTab, setSelectedTab] = useState("table");
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Shifts</h1>
          <p className="text-gray-600 mt-1">
            View and manage your scheduled shifts. Switch between calendar and
            table view.
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-3">
            <Button
              color="primary"
              startContent={
                <Icon icon="heroicons:document-duplicate" className="w-4 h-4" />
              }
              className="bg-gray-900 text-white hover:bg-gray-800 hover:border-transparent focus:outline-none"
              onPress={() => navigate({ to: "/bulk-create" })}
            >
              Bulk Create Shifts
            </Button>
            <Button
              color="primary"
              startContent={<Icon icon="heroicons:plus" className="w-4 h-4" />}
              className="bg-gray-900 text-white hover:bg-gray-800 hover:border-transparent focus:outline-none"
              onPress={() => navigate({ to: "/create" })}
            >
              Create Shift
            </Button>
          </div>
        )}
      </div>

      <div>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key.toString())}
          variant="solid"
          className={"w-full"}
          size={"sm"}
          classNames={{
            tabList: "gap-0 w-full",
            cursor: "w-full",
            tab: "data-[selected=true]:bg-white hover:border-transparent focus:outline-none",
            tabContent:
              "group-data-[selected=true]:text-gray-900 text-gray-600 font-bold",
          }}
        >
          <Tab key="calendar" title="Calendar View" />
          <Tab key="table" title="Table View" />
        </Tabs>

        <div className="p-6 px-1">
          {selectedTab === "calendar" ? (
            <ShiftsCalendarView />
          ) : (
            <ShiftsTableView />
          )}
        </div>
      </div>
    </div>
  );
};
