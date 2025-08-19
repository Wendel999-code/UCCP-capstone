"use client";

import { useEffect, useMemo, useState } from "react";
import type { Member } from "@/global/type";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/app/provider/UserContext";
import { useLinkMember } from "@/app/hooks/useMember";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import {
  Search,
  LinkIcon,
  X,
  User,
  Hash,
  Church,
  CheckCircle,
} from "lucide-react";

type LinkedMember = Member;

export default function LinkedMembersPage() {
  const { user, loading } = useUser();

  const storageKey = useMemo(
    () => (user?.id ? `linkedMembers_${user.id}` : "linkedMembers_guest"),
    [user?.id]
  );

  const [memberID, setMemberID] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);

  const [linkedMembers, setLinkedMembers] = useState<LinkedMember[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(linkedMembers));
    }
  }, [linkedMembers, storageKey]);

  const {
    data: linkedMember,
    isLoading: memberLoading,
    error: memberError,
  } = useLinkMember(memberID, searchEnabled);

  const memberErrorMessage =
    memberError instanceof Error ? memberError.message : undefined;

  const handleSearchMember = () => {
    if (!memberID.trim()) {
      toast.error("Please enter a Member ID");
      return;
    }
    setSearchEnabled(true);
  };

  const handleLinkMember = () => {
    if (
      linkedMember &&
      !linkedMembers.find((m: Member) => m.member_id === linkedMember.member_id)
    ) {
      setLinkedMembers((prev) => [...prev, linkedMember]);
      toast.success(
        `Successfully linked to ${linkedMember.firstName} ${linkedMember.lastName}`
      );
      setMemberID("");
      setSearchEnabled(false);
    }
  };

  const handleRemoveLinkedMember = (memberToRemove: Member) => {
    if (!memberToRemove.member_id) return;
    setLinkedMembers((prev) =>
      prev.filter((m: Member) => m.member_id !== memberToRemove.member_id)
    );
    toast.success("Member unlinked successfully");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-2 min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border rounded-md shadow-md  ">
      <div className="mb-6 sm:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-red-900 dark:text-yellow-500"
        >
          Linked Members
        </motion.h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Manage your linked member profiles. Search by Member ID to link a
          profile.
        </p>
      </div>

      {/* Search and Link Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Member ID
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter Member ID (e.g., PLN-123456)"
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
                className="flex-1 border-amber-500 ring-amber-400 placeholder:text-[10px] focus:ring-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                onKeyDown={(e) => e.key === "Enter" && handleSearchMember()}
              />
              <Button
                onClick={handleSearchMember}
                disabled={!memberID.trim() || memberLoading}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {memberLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {memberErrorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                  {memberErrorMessage}
                </p>
              </motion.div>
            )}

            {linkedMember && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    Member Found
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Full Name
                    </label>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      {linkedMember.firstName} {linkedMember.lastName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Member ID
                    </label>
                    <p className="font-mono font-semibold text-gray-900 dark:text-white text-base">
                      {linkedMember.member_id}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Category
                    </label>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      {linkedMember.category}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Local Church
                    </label>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      {linkedMember.Church?.brgy || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200 dark:border-amber-800">
                  <Button
                    onClick={handleLinkMember}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Link This Member
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Linked Members List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold">
            Your Linked Members
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {linkedMembers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
              <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No members linked yet</p>
              <p className="text-xs">
                Use the form above to link a member by ID
              </p>
            </div>
          ) : (
            linkedMembers.map((member: Member, index: number) => (
              <AnimatePresence key={member.member_id}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="h-full bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-amber-950/40 border border-amber-200/60 dark:border-amber-700/60 rounded-xl p-4 hover:shadow-lg hover:shadow-amber-200/40 dark:hover:shadow-amber-800/10 transition-all duration-300 backdrop-blur-sm hover:border-amber-300 dark:hover:border-amber-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-amber-200/50 dark:ring-amber-700/50">
                            {member.firstName?.charAt(0)}
                            {member.lastName?.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {member.firstName} {member.lastName}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Hash className="h-3 w-3 text-amber-500" />
                              <span className="font-mono bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-md text-xs">
                                {member.member_id}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 bg-amber-100/50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                            <User className="h-3 w-3 text-amber-500" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {member.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-orange-100/50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
                            <Church className="h-3 w-3 text-orange-500" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {member.Church?.brgy || "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400 bg-green-100/50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="font-medium text-green-700 dark:text-green-400">
                              Linked successfully
                            </span>
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveLinkedMember(member)}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:scale-110"
                        aria-label="Unlink member"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
