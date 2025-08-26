"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { getFirstName, getInitial } from "@/lib/utils/member";
import { motion } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const { user, loading } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

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

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0   bg-white dark:bg-gray-900 shadow-sm  border dark:border-gray-700  z-40 border-b  backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-18 items-center px-6 justify-between">
        <Link href="/admin/dashboard" className="group">
          <motion.div
            className="flex items-center gap-3 px-22"
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
                className="relative rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                priority
              />
            </div>
          </motion.div>
        </Link>

        <nav className="hidden md:flex gap-6">
          <motion.div
            className="flex items-center gap-3"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ModeToggle />

            {loading ? (
              <Skeleton className="h-7 w-7 rounded-full" />
            ) : user ? (
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
                    <DialogTitle className="text-2xl font-extrabold text-gray-900 dark:text-yellow-500">
                      Profile
                    </DialogTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your account details
                    </p>
                  </DialogHeader>

                  {/* Avatar */}
                  <div className="flex justify-center mb-4 mt-6">
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
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-amber-200 dark:border-amber-800 pb-2">
                      Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <Input
                          value={user.email}
                          disabled
                          className="text-gray-900 font-medium dark:text-white 
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
                          className="text-gray-900 font-medium dark:text-white 
                                     border-amber-500 ring-amber-400 bg-amber-50/50 dark:bg-amber-950/20
                                     cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 grid grid-cols-2 gap-2 ">
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
            ) : null}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
