"use client";

import { useRedirectIfAuthenticated } from "@/app/hooks/useRedirectIfAuthenticated";
import { motion } from "framer-motion";
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import RequestHistory from "../request/components/RequestHistory";

const RequestHistoryPage = () => {
  const { user } = useRedirectIfAuthenticated({ disabled: true });
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    if (user?.id) {
      setUserID(user?.id);
    }
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/member/dashboard/request"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Request</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-lg"></div>
            <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-3 rounded-full">
              <History className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Request History
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Track all your certificate requests and their current status
            </p>
          </div>
        </div>
      </motion.div>

      {/* Request History Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {userID ? (
          <RequestHistory userID={userID} />
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-lg"></div>
                <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-full">
                  <History className="h-12 w-12 text-amber-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Loading Member Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we load your member details...
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RequestHistoryPage;
