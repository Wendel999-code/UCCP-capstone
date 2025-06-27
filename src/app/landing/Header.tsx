"use client";

import { ModeToggle } from "@/components/ModeToogle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Logout } from "@/lib/supabase/actions/auth";
import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

const navItems = ["about", "services", "events", "testimonials", "contact"];

function Header() {
  const { user, loading } = useRedirectIfAuthenticated();

  const handleLogout = async () => {
    const res = await Logout();
    toast[res.success ? "success" : "error"](res.message);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between py-16">
        <Link href="/">
          <div className="px-4 md:px-16">
            <Image
              src={"/uccp.jpg"}
              alt="CANA Circuit Logo"
              width={70}
              height={80}
              className="rounded-md w-auto h-20 object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="text-md hover:text-yellow-500 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
          <ModeToggle />
          {loading ? (
            <Skeleton className="h-5 w-12 rounded-md" />
          ) : user ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="group h-[30px] dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
            >
              Logout
              <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1" />
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="group h-[30px] dark:bg-amber-700 dark:hover:bg-amber-600 bg-amber-500 hover:bg-amber-600"
              >
                Sign in
                <ArrowRight className="ml-2 h-2 w-2 group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile menu toggle button */}
        <div className="md:hidden  flex">
          <Sheet>
            <SheetTrigger className="mr-2">
              <Menu className="hover:text-amber-500 transition-colors cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="h-[450px] w-[260px]  rounded-md">
              <SheetHeader>
                <SheetTitle className="text-center">
                  {" "}
                  <h1 className="text-xl font-bold tracking-tighter">
                    <span className="text-red-900">CANA</span>{" "}
                    <span className="text-amber-500">Circuit</span>
                  </h1>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col md:hidden gap-7 items-start ml-4">
                {navItems.map((section) => (
                  <Link
                    key={section}
                    href={`#${section}`}
                    className="text-md hover:text-yellow-500 transition-colors"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                ))}
                <ModeToggle />
                {loading ? (
                  <Skeleton className="h-5 w-12 rounded-md" />
                ) : user ? (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="group h-[30px] dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
                  >
                    Logout
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group h-[30px] dark:bg-amber-700 dark:hover:bg-amber-600 bg-amber-500 hover:bg-amber-600"
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

      {/* Mobile Menu */}
    </motion.header>
  );
}

export default Header;
