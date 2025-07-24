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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { motion } from "framer-motion";
import { ArrowRight, File, Home, Menu, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const navItems = [
  {
    href: "/member/dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: "/member/dashboard/request",
    label: "Certificates",
    icon: <File className="h-4 w-4" />,
  },
];
const Nav = () => {
  const { user, loading } = useUser();

  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

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
        <Link href="/member/dashboard" className="flex items-center">
          <div className="p-2  md:px-22">
            <Image
              src="/uccp.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
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
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="group h-7 px-3 text-[10px] cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
                  >
                    Logout
                    <ArrowRight className="ml-1 h-[5px] w-[5px] transition-transform group-hover:translate-x-1" />
                  </Button>{" "} */}
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
              <SheetContent className="h-[270px] w-[260px]  rounded-md">
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
                            className="group text-gray-500 dark:text-gray-400 h-7 hover:border transition-colors hover:bg-yellow-500   border-yellow-500 dark:hover:border-yellow-500 px-3 text-xs cursor-pointer "
                          >
                            <UserIcon className=" h-4 w-5 hover:bg-yellow-500" />{" "}
                            Profile
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
                                className=" text-black text-xs font-bold dark:text-white cursor-not-allowed border-amber-500  ring-amber-400 "
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
                                className=" text-black text-xs font-bold dark:text-white ring-amber-400 border-amber-500 cursor-not-allowed  "
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="group h-7 px-3 text-[10px] cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
                      >
                        Logout
                        <ArrowRight className="ml-1 h-[5px] w-[5px] transition-transform group-hover:translate-x-1" />
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
