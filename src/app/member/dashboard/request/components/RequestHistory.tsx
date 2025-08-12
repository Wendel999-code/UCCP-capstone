"use client";

import { useGetReqCertificateByMemberID } from "@/app/hooks/useCertificate";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/supabase/client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Inbox,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface RequestHistoryProps {
  userID: string;
}

const RequestHistory = ({ userID }: RequestHistoryProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: requests,
    isLoading: isDataLoading,
    refetch,
  } = useGetReqCertificateByMemberID(userID);

  useEffect(() => {
    const channel = supabase
      .channel("update-req-certificate")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "req_certificate",
        },
        () => {
          refetch();
        }
      )

      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [refetch]);

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          icon: CheckCircle,
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
          bgColor: "bg-green-50 dark:bg-green-900/10",
          text: "Completed",
        };
      case "pending":
        return {
          icon: Clock,
          color:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800",
          bgColor: "bg-amber-50 dark:bg-amber-900/10",
          text: "Pending",
        };
      case "rejected":
        return {
          icon: XCircle,
          color:
            "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800",
          bgColor: "bg-red-50 dark:bg-red-900/10",
          text: "Rejected",
        };
      default:
        return {
          icon: AlertCircle,
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800",
          bgColor: "bg-gray-50 dark:bg-gray-900/10",
          text: "Unknown",
        };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading || isDataLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-amber-600" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Request History
          </h2>
        </div>

        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/30 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-lg"></div>
            <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-full">
              <Inbox className="h-12 w-12 text-amber-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              No Requests Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              You haven't submitted any certificate requests yet. Submit your
              first request to see it here.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Sort requests in reverse chronological order
  const sortedRequests = [...requests].sort(
    (a, b) =>
      new Date(b.created_at ?? "").getTime() -
      new Date(a.created_at ?? "").getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        {/* <FileText className="h-5 w-5 text-amber-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Request History
        </h2> */}
        <Badge variant="secondary" className="ml-auto text-xs">
          {requests.length} {requests.length === 1 ? "request" : "requests"}
        </Badge>
      </div>

      <div className="space-y-4">
        {sortedRequests.map((request, index) => {
          const statusConfig = getStatusConfig(request?.status ?? "");
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-all duration-200 ${statusConfig.bgColor}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Certificate Request #{request.id.slice(-6)}
                    </CardTitle>
                    <Badge
                      className={`flex items-center gap-1 px-2 py-1 text-xs font-medium border ${statusConfig.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.text}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs md:text-md">
                        Submitted: {formatDate(request?.created_at ?? "")}
                      </span>
                    </div>

                    {request.updated_at &&
                      request.updated_at !== request.created_at && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>
                            Updated: {formatDate(request?.updated_at ?? "")}
                          </span>
                        </div>
                      )}
                  </div>

                  <div className="pt-2 border-t border-amber-200/50 dark:border-amber-800/30">
                    <div className="grid grid-cols-2 gap-18  text-sm">
                      <div>
                        <span className="text-gray-500 text-xs md:text-md dark:text-gray-400">
                          Name:
                        </span>
                        <p className="font-medium text-xs md:text-md text-gray-800 dark:text-gray-200">
                          {request.firstName} {request.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs md:text-md dark:text-gray-400">
                          Member ID:
                        </span>
                        <p className="font-medium text-gray-800 text-xs md:text-md dark:text-gray-200">
                          {request.member_id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {request.status === "Declined" && (
                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-red-800 dark:text-red-400 mb-1">
                            Rejection Reason:
                          </p>
                          <p className="text-red-700 dark:text-red-300">
                            sorry your req cert cannot be processed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestHistory;
