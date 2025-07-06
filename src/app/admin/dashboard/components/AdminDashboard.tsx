"use client";

import { useSidebarData } from "@/app/hooks/useSideBar";
import { Skeleton } from "@/components/ui/skeleton";
import Analytics from "./Analytics";

const AdminDashboard = () => {
  const { data, isLoading } = useSidebarData();

  return (
    <div className="flex  min-h-screen w-full">
      <main className="flex-1 rounded-md px-4 py-6 lg:px-6 lg:py-8 bg-muted/50 overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center space-y-2">
          {isLoading ? (
            <>
              <Skeleton className="h-9 w-[220px] rounded-2xl bg-neutral-300 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-[280px] rounded-md bg-neutral-300 dark:bg-neutral-700" />
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-2xl font-bold text-center text-red-900 dark:text-yellow-500 tracking-tight">
                {`${data?.church?.brgy} Local Church`}
              </h1>
              <p className="text-sm text-muted-foreground">
                You have administrative access to manage {data?.church?.brgy}{" "}
                Church's dashboard.
              </p>
            </>
          )}
        </div>

        <Analytics />
      </main>
    </div>
  );
};

export default AdminDashboard;
