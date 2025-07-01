"use client";
import { getVisitorCount, logVisitor } from "@/lib/supabase/actions/visit";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const Visits = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      await logVisitor();
      const visitorCount = await getVisitorCount();
      setCount(visitorCount);
    };
    fetchCount();
  }, []);

  return (
    <AnimatePresence>
      {count !== null ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center text-center gap-2 text-amber-500 rounded-full border   px-4 py-1 dark:text-amber-500 dark:border-yellow-500 dark:bg-yellow-900/20  text-sm font-medium shadow-sm mt-4"
        >
          <Eye className="h-4 w-4 text-center" />
          {count.toLocaleString()} visitors
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 italic mt-4"
        >
          Loading visitor count...
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Visits;
