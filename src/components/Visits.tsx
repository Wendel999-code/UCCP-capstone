"use client";
import { useVisitCount } from "@/app/hooks/visit";
import supabase from "@/lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

const Visits = () => {
  const { data: count, isLoading, refetch } = useVisitCount();

  useEffect(() => {
    const channel = supabase
      .channel("visitor-count")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "visitors",
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

  return (
    <AnimatePresence>
      {!isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center text-center gap-2 text-amber-500 rounded-full border   px-4 py-1 dark:text-amber-500 dark:border-yellow-500 dark:bg-yellow-900/20  text-sm font-medium shadow-sm "
        >
          <Eye className="h-4 w-4 text-center" />
          {count?.toLocaleString()} visitors
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 italic mt-4"
        >
          <Skeleton className="h-10 w-36  md:w-30 bg-gray-300 dark:bg-slate-800     rounded-md" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Visits;
