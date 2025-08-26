"use client";

import { useSidebarData } from "@/app/hooks/useSideBar";
import { Skeleton } from "@/components/ui/skeleton";
import Analytics from "./Analytics";

const AdminDashboard = () => {
  const { data, isLoading } = useSidebarData();

  return (
    <div className="flex min-h-screen w-full">
      <main
        className="flex-1 rounded-md px-4 py-6 lg:px-8 lg:py-10 
        bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-amber-900/10 
        overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-300 
        dark:scrollbar-thumb-amber-600 hover:scrollbar-thumb-amber-400 
        dark:hover:scrollbar-thumb-amber-500 scrollbar-thumb-rounded-full shadow-inner"
      >
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center space-y-3 pb-6 border-b border-amber-200/30 dark:border-amber-800/30">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-[220px] rounded-lg bg-neutral-300 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-[280px] rounded-md bg-neutral-300 dark:bg-neutral-700" />
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-amber-900 dark:text-amber-400">
                {`${data?.church?.brgy} Local Church`}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg">
                You have administrative access to manage{" "}
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  {data?.church?.brgy}
                </span>{" "}
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
