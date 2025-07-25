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
import { motion } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const { user, loading } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-18 items-center px-6 justify-between">
        <Link href="/admin/dashboard">
          <div className="px-4 md:px-22">
            <Image
              src="/uccp.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full rounded-b-3xl dark:rounded-b-full h-11 dark:h-10 w-10 object-cover"
            />
          </div>
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
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group h-7 border transition-colors hover:bg-yellow-500   border-yellow-500 dark:hover:border-yellow-500 px-3 text-xs cursor-pointer "
                  >
                    <UserIcon className=" h-4 w-5 hover:bg-yellow-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xs rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-red-900 dark:text-yellow-500 text-2xl">
                      Profile
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 text-start">
                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs text-gray-800 dark:text-gray-400 "
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        value={user.email}
                        disabled
                        className=" text-black font-bold dark:text-white cursor-not-allowed border-amber-500  ring-amber-400 "
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs text-gray-800 dark:text-gray-400  "
                        htmlFor="role"
                      >
                        Role
                      </label>
                      <Input
                        id="role"
                        value={user.role}
                        disabled
                        className=" text-black font-bold dark:text-white ring-amber-400 border-amber-500 cursor-not-allowed  "
                      />
                    </div>

                    <div>
                      <Button
                        onClick={() => router.push("/auth/reset-password")}
                        size={"sm"}
                        className="cursor-pointer  text-black text-xs "
                      >
                        Change Password
                      </Button>
                    </div>
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
