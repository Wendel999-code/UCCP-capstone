"use client";

import { cn } from "@/app/lib/utils";
import { useUser } from "@/app/provider/UserContext";
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
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { getFirstName, getInitial } from "@/lib/utils/member";
import { set } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowRight,
  File,
  History,
  Home,
  Menu,
  UserIcon,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const navItems = [
  {
    href: "/member/dashboard",
    label: "Home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: "/member/dashboard/linked-member",
    label: "Linked Member",
    icon: <Users className="h-4 w-4" />,
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
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

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
                    {/* Small Profile Button */}
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group h-7 border border-yellow-500     
                 px-3 text-xs transition-colors cursor-pointer"
                      >
                        <UserIcon className="h-4 w-5 text-yellow-600 hover:border-yellow-500    dark:text-yellow-400 group-hover:text-white" />
                      </Button>
                    </DialogTrigger>

                    {/* Profile Dialog Content */}
                    <DialogContent className="max-w-lg rounded-2xl p-8 bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-700">
                      <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl text-center font-extrabold text-gray-900 dark:text-yellow-500">
                          Profile
                        </DialogTitle>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                          Manage your account details
                        </p>
                      </DialogHeader>

                      {/* Avatar */}
                      <div className="flex justify-center mb-4 mt-3">
                        <div
                          className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 
                   flex items-center justify-center text-white text-3xl font-bold shadow-lg
                   ring-4 ring-amber-200 dark:ring-amber-700"
                        >
                          {getInitial(user.email)}
                        </div>
                      </div>

                      {/* Greeting */}
                      <div className="text-center mb-6">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          Hi, {getFirstName(user.email)}
                        </p>
                      </div>

                      {/* Account Information */}
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-1  gap-4">
                          {/* Email */}
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email
                            </label>
                            <Input
                              value={user.email}
                              disabled
                              className="text-gray-900  dark:text-white 
                       border-amber-500 ring-amber-400 bg-amber-50/50 dark:bg-amber-950/20
                       cursor-not-allowed"
                            />
                          </div>

                          {/* Role */}
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Role
                            </label>
                            <Input
                              value={user.role}
                              disabled
                              className="text-gray-900  dark:text-white 
                       border-amber-500 ring-amber-400 bg-amber-50/50 dark:bg-amber-950/20
                       cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3 grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => {
                            setProfileOpen(false);
                            router.push("/auth/reset-password");
                          }}
                          className="w-full h-10 bg-gradient-to-r from-amber-500 to-orange-500 
                   hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl 
                   shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Change Password
                        </Button>
                        <Button
                          onClick={() => {
                            setProfileOpen(false);
                            handleLogout();
                          }}
                          className="w-full h-10 bg-gradient-to-r from-red-500 to-red-600 
                   hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl 
                   shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Sign Out
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                ""
              )}
            </motion.div>
          </nav>
          {/* Mobile Sheet */}
          <div className="md:hidden flex">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="mr-2">
                <Menu className="hover:text-amber-500 transition-colors cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="h-[400px] w-[280px] rounded-md">
                <SheetHeader>
                  <SheetTitle className="text-center">
                    <p className="text-xl font-bold tracking-tighter">
                      <span className="text-red-900">CANA</span>{" "}
                      <span className="text-amber-500">Circuit</span>
                    </p>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col md:hidden gap-3 items-start ml-4">
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

                  {loading ? (
                    <Skeleton className="h-5 w-12 rounded-md" />
                  ) : user ? (
                    <Button
                      onClick={() => {
                        setOpen(false); // close the sheet
                        setMobileProfileOpen(true); // open the profile dialog
                      }}
                      variant="ghost"
                      size="sm"
                      className="group h-7 px-3 transition-colors cursor-pointer text-gray-600 text-sm dark:text-gray-400"
                    >
                      <UserIcon className="h-4 w-5" /> Profile
                    </Button>
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
          {/* Profile Dialog OUTSIDE of the Sheet */}
          <Dialog open={mobileProfileOpen} onOpenChange={setMobileProfileOpen}>
            <DialogContent
              className="max-w-sm w-full sm:rounded-2xl rounded-lg 
               p-4 bg-white dark:bg-gray-900 shadow-2xl 
               border border-gray-100 dark:border-gray-700 
               max-h-[90vh] overflow-y-auto"
            >
              <DialogHeader className="text-center mb-3">
                <DialogTitle className="sm:text-xl text-lg font-extrabold text-gray-900 dark:text-yellow-500">
                  Profile
                </DialogTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your account details
                </p>
              </DialogHeader>

              {/* Avatar + Greeting */}
              {user && (
                <>
                  <motion.div
                    className="flex justify-center mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 
                       flex items-center justify-center text-white text-2xl font-bold shadow-md
                       ring-2 ring-amber-200 dark:ring-amber-700"
                    >
                      {getInitial(user?.email)}
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      Hi, {getFirstName(user?.email)}
                    </p>
                  </motion.div>
                </>
              )}

              <Separator className="my-3" />

              {/* Account Info */}
              <motion.div
                className="space-y-3 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Account Information
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <Input
                      value={user?.email}
                      disabled
                      className="text-gray-900 dark:text-white border border-amber-500 
                       bg-amber-50/50 dark:bg-amber-950/20 cursor-not-allowed text-xs truncate"
                      title={user?.email}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </label>
                    <Input
                      value={user?.role}
                      disabled
                      className="text-gray-900 capitalize dark:text-white border border-amber-500 
                       bg-amber-50/50 dark:bg-amber-950/20 cursor-not-allowed text-xs"
                    />
                  </div>
                </div>
              </motion.div>

              <Separator className="my-3" />

              {/* Actions */}
              <motion.div
                className="grid grid-cols-2 gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  onClick={() => {
                    setMobileProfileOpen(false);
                    router.push("/auth/reset-password");
                  }}
                  className="w-full h-9 bg-gradient-to-r from-amber-500 to-orange-500 
                   hover:from-amber-600 hover:to-orange-600 text-white 
                   rounded-lg shadow-md hover:shadow-lg text-xs"
                >
                  Change Password
                </Button>
                <Button
                  onClick={() => {
                    setMobileProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full h-9 bg-gradient-to-r from-red-500 to-red-600 
                   hover:from-red-600 hover:to-red-700 text-white 
                   rounded-lg shadow-md hover:shadow-lg text-xs"
                >
                  Sign Out
                </Button>
              </motion.div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.header>
  );
};

export default Nav;
