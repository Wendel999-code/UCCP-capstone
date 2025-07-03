"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function DeleteDialog({
  open,
  setOpen,
  onDelete,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onDelete: () => Promise<void>;
  title?: string;
  description?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      setOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-700 dark:text-red-400">
            {title}
          </DialogTitle>
          <DialogDescription className="text-neutral-700 dark:text-neutral-300 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
