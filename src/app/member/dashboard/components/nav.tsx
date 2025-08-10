"use client";

import { cn } from "@/app/lib/utils";
import { useUser } from "@/app/provider/UserContext";
import { useLinkMember } from "@/app/hooks/useMember";
import { ModeToggle } from "@/components/ModeToogle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  File,
  History,
  Home,
  Menu,
  UserIcon,
  Search,
   LinkIcon,
  X,
  
  User,
  Hash,
  CheckCircle,
  Plus,
  Link2,
  Church,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const navItems = [
  {
    href: "/member/dashboard",
    label: "Home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: "/member/dashboard/request",
    label: "Certificates",
    icon: <File className="h-4 w-4" />,
  },
  {
    href: "/member/dashboard/history",
    label: "History",
    icon: <History className="h-4 w-4" />,
  },
];

const Nav = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [linkMemberOpen, setLinkMemberOpen] = useState(false);
  const [memberID, setMemberID] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);

  // TODO implement db table instead of local storage
  const [linkedMembers, setLinkedMembers] = useState<any[]>(() => {
    
    if (typeof window !== 'undefined' && user?.id) {
      const stored = localStorage.getItem(`linkedMembers_${user.id}`);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Save linkedMembers to localStorage whenever it changes
  useEffect(() => {
    if (user?.id && typeof window !== 'undefined') {
      localStorage.setItem(`linkedMembers_${user.id}`, JSON.stringify(linkedMembers));
    }
  }, [linkedMembers, user?.id]);

  const {
    data: linkedMember,
    isLoading: memberLoading,
    error: memberError,
  } = useLinkMember(memberID, searchEnabled);

  console.log("linked member", linkedMember)

  const handleLogout = async () => {
    try {
      const res = await LogoutV2();
      toast[res.success ? "success" : "error"](res.message);

      if (res.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An unexpected error occurred during logout.");
    }
  };

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
      !linkedMembers.find((m) => m.member_id === linkedMember.member_id)
    ) {
      setLinkedMembers((prev) => [...prev, linkedMember]);
      toast.success(
        `Successfully linked to ${linkedMember.firstName} ${linkedMember.lastName}`
      );
      setMemberID("");
      setSearchEnabled(false);
    }
  };

  const handleRemoveLinkedMember = (memberIdToRemove: string) => {
    setLinkedMembers((prev) =>
      prev.filter((m) => m.member_id !== memberIdToRemove)
    );
    toast.success("Member unlinked successfully");
  };



  if (loading) return <Skeleton className="h-10 w-full" />;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className=" flex md:h-20 h-15 items-center px-4 justify-between ">
        <Link href="/member/dashboard" className="group">
          <motion.div
            className="flex items-center gap-3 md:px-22"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"
              />
              <Image
                src="/uccp.jpg"
                alt="CANA Circuit Logo"
                width={48}
                height={48}
                className="relative  w-[38px] md:w-[48px] rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                priority
              />
            </div>
          </motion.div>
        </Link>

        <div className="flex gap-2">
          {" "}
          <ModeToggle />
          <nav className="hidden md:flex gap-6">
            <motion.div
              className="flex items-center gap-3"
              transition={{ type: "spring", stiffness: 300 }}
            >
              {loading ? (
                <Skeleton className="h-5 w-5 " />
              ) : user ? (
                <>
                  <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group h-7 border transition-colors hover:bg-yellow-500   border-yellow-500 dark:hover:border-yellow-500 px-3 text-xs cursor-pointer "
                      >
                        <UserIcon className=" h-4 w-5 hover:bg-yellow-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-center text-red-900 dark:text-yellow-500 text-2xl font-bold">
                          Profile
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-6 text-start">
                        {/* User Information Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-amber-200 dark:border-amber-800 pb-2">
                            Account Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <Input
                                id="email"
                                value={user.email}
                                disabled
                                className="text-gray-900 font-medium dark:text-white cursor-not-allowed border-amber-500 ring-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="role"
                              >
                                Role
                              </label>
                              <Input
                                id="role"
                                value={user.role}
                                disabled
                                className="text-gray-900 font-medium dark:text-white ring-amber-400 border-amber-500 cursor-not-allowed bg-amber-50/50 dark:bg-amber-950/20"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Linked Members Section */}
                        <div className="space-y-4 overflow-x-hidden">
                          <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800 pb-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              Linked Members
                            </h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setLinkMemberOpen(true)  }
                              className="h-8 px-3 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 border-amber-300 dark:border-amber-700"
                            >
                              <Link2 className="h-4 w-4 mr-1" />
                              Link
                            </Button>
                          </div>

                          {/* Linked Members Feed */}
                          <div className="space-y-3 overflow-x-hidden max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-600  scrollbar-thumb-rounded-full">
                            {linkedMembers.length === 0 ? (
                              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No members linked yet</p>
                                <p className="text-xs">
                                  Click "Link New Member" to get started
                                </p>
                              </div>
                            ) : (
                              <AnimatePresence>
                                {linkedMembers.map((member, index) => (
                                  <motion.div
                                    key={member.member_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                  >
                                    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-amber-950/40 border border-amber-200/60 dark:border-amber-700/60 rounded-xl p-4 hover:shadow-lg hover:shadow-amber-200/50 dark:hover:shadow-amber-800/20 transition-all duration-300 backdrop-blur-sm  hover:border-amber-300 dark:hover:border-amber-600">
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-3">
                                          <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-amber-200/50 dark:ring-amber-700/50">
                                              {member.firstName.charAt(0)}
                                              {member.lastName.charAt(0)}
                                            </div>
                                            <div>
                                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {member.firstName}{" "}
                                                {member.lastName}
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
                                              <span className="font-medium text-green-700 dark:text-green-400">Linked successfully</span>
                                            </span>
                                          </div>
                                        </div>

                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            handleRemoveLinkedMember(
                                              member.member_id
                                            )
                                          }
                                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:scale-110"
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => router.push("/auth/reset-password")}
                            size={"sm"}
                            className="cursor-pointer  text-xs flex-1 bg-amber-800 hover:bg-amber-600 text-white"
                          >
                            Change Password
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Link Member Dialog */}
                  <Dialog
                    open={linkMemberOpen}
                    onOpenChange={setLinkMemberOpen}
                  >
                    <DialogContent className="max-w-lg rounded-2xl">
                      <DialogHeader>
                        <div className="flex items-center justify-between">
                          <DialogTitle className="text-center text-red-900 dark:text-yellow-500 text-xl font-bold">
                            Link Member Profile
                          </DialogTitle>
                         
                        </div>
                      </DialogHeader>

                      <div className="space-y-4">
                        {/* Member ID Input */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Member ID
                          </label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter Member ID (e.g., PLN-001)"
                              value={memberID}
                              onChange={(e) => setMemberID(e.target.value)}
                              className="flex-1 border-amber-500 ring-amber-400 focus:ring-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSearchMember()
                              }
                            />
                            <Button
                              onClick={handleSearchMember}
                              disabled={!memberID.trim() || memberLoading}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-4"
                            >
                              {memberLoading ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              ) : (
                                <Search className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Member Details Display */}
                        <AnimatePresence mode="wait">
                          {memberError && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
                            >
                              <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                                {memberError.message}
                              </p>
                            </motion.div>
                          )}

                          {linkedMember && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-lg"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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
                                    {linkedMember.firstName}{" "}
                                    {linkedMember.lastName}
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
                                <div className="sm:col-span-2 space-y-1">
                                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    Address
                                  </label>
                                  <p className="font-semibold text-gray-900 dark:text-white text-base">
                                    {linkedMember.address}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-amber-200 dark:border-amber-800">
                                <Button onClick={() => (handleLinkMember(), setLinkMemberOpen(false))}

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
                    </DialogContent>
                  </Dialog>
                 
                </>
              ) : (
                ""
              )}
            </motion.div>
          </nav>
          <div className="md:hidden  flex">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="mr-2">
                <Menu className="hover:text-amber-500 transition-colors cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="h-[400px] w-[280px] rounded-md">
                <SheetHeader>
                  <SheetTitle className="text-center">
                    {" "}
                    <p className="text-xl font-bold tracking-tighter">
                      <span className="text-red-900">CANA</span>{" "}
                      <span className="text-amber-500">Circuit</span>
                    </p>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col md:hidden gap-3 items-start ml-4">
                  <>
                    {navItems.map(({ href, label, icon }) => {
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-yellow-100 text-yellow-900 dark:bg-yellow-300/10 dark:text-yellow-300"
                              : "text-muted-foreground hover:bg-yellow-50 hover:text-yellow-800 dark:hover:bg-muted-foreground/10"
                          )}
                        >
                          {icon}
                          {label}
                        </Link>
                      );
                    })}
                  </>

                  {loading ? (
                    <Skeleton className="h-5 w-12 rounded-md" />
                  ) : user ? (
                    <>
                      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group ml-1  text-gray-500 dark:text-gray-400 h-7 hover:border transition-colors hover:bg-yellow-500   border-yellow-500 dark:hover:border-yellow-500 px-3 text-sm cursor-pointer "
                          >
                            <UserIcon className=" h-4 w-5 hover:bg-yellow-500" />{" "}
                            Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl rounded-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-center text-red-900 dark:text-yellow-500 text-2xl font-bold">
                              Profile
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-6 text-start">
                            {/* User Information Section */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-amber-200 dark:border-amber-800 pb-2">
                                Account Information
                              </h3>
                              <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col gap-1">
                                  <label
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    htmlFor="email"
                                  >
                                    Email
                                  </label>
                                  <Input
                                    id="email"
                                    value={user.email}
                                    disabled
                                    className="text-gray-900 font-medium dark:text-white cursor-not-allowed border-amber-500 ring-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                                  />
                                </div>

                                <div className="flex flex-col gap-1">
                                  <label
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    htmlFor="role"
                                  >
                                    Role
                                  </label>
                                  <Input
                                    id="role"
                                    value={user.role}
                                    disabled
                                    className="text-gray-900 font-medium dark:text-white ring-amber-400 border-amber-500 cursor-not-allowed bg-amber-50/50 dark:bg-amber-950/20"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Linked Members Section for Mobile */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800 pb-2">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                  Linked Members
                                </h3>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setLinkMemberOpen(true)}
                                  className="h-8 px-3 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 border-amber-300 dark:border-amber-700"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Link
                                </Button>
                              </div>

                              {/* Linked Members Feed for Mobile */}
                              <div className="space-y-3 max-h-32 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-600 hover:scrollbar-thumb-amber-400 dark:hover:scrollbar-thumb-amber-500 scrollbar-thumb-rounded-full">
                                {linkedMembers.length === 0 ? (
                                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-xs">No members linked</p>
                                  </div>
                                ) : (
                                  <AnimatePresence>
                                    {linkedMembers.map((member, index) => (
                                      <motion.div
                                        key={member.member_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group"
                                      >
                                        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-amber-950/40 border border-amber-200/60 dark:border-amber-700/60 rounded-lg p-3 backdrop-blur-sm hover:shadow-md hover:shadow-amber-200/30 dark:hover:shadow-amber-800/20 transition-all duration-300 hover:scale-[1.01] hover:border-amber-300 dark:hover:border-amber-600">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-amber-200/50 dark:ring-amber-700/50">
                                                {member.firstName.charAt(0)}
                                                {member.lastName.charAt(0)}
                                              </div>
                                              <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                                  {member.firstName}{" "}
                                                  {member.lastName}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-md">
                                                  {member.member_id}
                                                </p>
                                              </div>
                                            </div>

                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                handleRemoveLinkedMember(
                                                  member.member_id
                                                )
                                              }
                                              className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-6 w-6 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:scale-110"
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </AnimatePresence>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button
                                onClick={() =>
                                  router.push("/auth/reset-password")
                                }
                                size={"sm"}
                                className="cursor-pointer  text-xs flex-1 bg-amber-600 hover:bg-amber-500 text-white"
                              >
                                Change Password
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="group ml-4 h-7 px-3 text-[12px] cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
                      >
                        Logout
                      </Button>{" "}
                    </>
                  ) : (
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        size="sm"
                        className="group h-[30px] ml-4 dark:bg-amber-700 dark:hover:bg-amber-600 bg-amber-500 hover:bg-amber-600"
                      >
                        Sign in
                        <ArrowRight className="ml-2 h-2 w-2 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Nav;
