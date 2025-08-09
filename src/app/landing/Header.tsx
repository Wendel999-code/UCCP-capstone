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
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

const navItems = [
  { label: "Home", slug: "", icon: "🏠" },
  { label: "About", slug: "about", icon: "📖" },
  { label: "Testimonials", slug: "testimonials", icon: "💬" },
  { label: "Contact", slug: "contact", icon: "📞" },
];

function Header() {
  const { user, loading } = useRedirectIfAuthenticated();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleLogout = async () => {
    const res = await LogoutV2();
    toast[res.success ? "success" : "error"](res.message);
    if (res.success) {
      setOpen(false);
      router.replace("/");
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-amber-200/20 dark:border-amber-800/20"
            : "bg-transparent"
        }
      `}
    >
      {/* Background gradient overlay when scrolled */}
      <div
        className={`
        absolute inset-0 transition-opacity duration-500
        ${
          scrolled
            ? "opacity-100 bg-gradient-to-r from-amber-50/30 via-white/40 to-orange-50/30 dark:from-gray-900/40 dark:via-gray-800/40 dark:to-gray-900/40"
            : "opacity-0"
        }
      `}
      />

      <div className="container relative z-10 flex h-20 items-center justify-between px-4 md:px-8 lg:px-16">
        {/* Logo Section */}
        <Link href="/" className="group">
          <motion.div
            className="flex items-center gap-3"
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center ml-42 gap-8">
          {navItems.map(({ label, slug, icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={label === "Home" ? "/" : `/#${slug}`}
                className={`
                  group relative px-4 py-2 rounded-xl font-medium transition-all duration-300
                  
                  text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400
                `}
              >
                <span className="flex items-center gap-2">
                  {/* <span className="text-sm">{icon}</span> */}
                  {label}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ModeToggle />

          {loading ? (
            <Skeleton className="h-10 w-20 rounded-xl" />
          ) : user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleLogout}
                variant="outline"
                className="group h-10 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Logout</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/auth/login">
                <Button className="group h-10 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Sign In</span>
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-3">
          <ModeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-2 rounded-xl transition-all duration-300
                  ${
                    scrolled
                      ? "bg-amber-100/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      : "bg-white/10 backdrop-blur-sm text-gray-700 dark:text-white hover:bg-amber-100/50 dark:hover:bg-amber-900/30"
                  }
                `}
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-80 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-l border-amber-200/20 dark:border-amber-800/20"
            >
              <SheetHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-sm" />
                        <Image
                          src="/uccp.jpg"
                          alt="CANA Circuit"
                          width={40}
                          height={40}
                          className="relative rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">
                          <span className="text-amber-600">CANA</span>{" "}
                          <span className="text-gray-800 dark:text-white">
                            Circuit
                          </span>
                        </h2>
                        <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                          "Turning Water Into Wine"
                        </p>
                      </div>
                    </div>
                  </SheetTitle>
                  {/* 
                  <motion.button
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors duration-300"
                  >
                    <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </motion.button> */}
                </div>
              </SheetHeader>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map(({ label, slug, icon }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={label === "Home" ? "/" : `/#${slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 p-4 rounded-xl hover:bg-amber-100/50 dark:hover:bg-amber-900/30 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300"
                    >
                      {/* <span className="text-lg">{icon}</span> */}
                      <span className="font-medium">{label}</span>
                      <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Section */}
                <div className="mt-8 pt-6 px-2 border-t border-amber-200/50 dark:border-amber-800/30">
                  {loading ? (
                    <Skeleton className="h-12 w-full rounded-xl" />
                  ) : user ? (
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-lg group"
                    >
                      <span>Logout</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  ) : (
                    <Link href="/auth/login" onClick={() => setOpen(false)}>
                      <Button className="w-full  h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl shadow-lg group">
                        <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Sign In</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Decorative Elements */}
              <div className="absolute bottom-6 right-6 opacity-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-8 w-8 text-amber-400" />
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom border animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.header>
  );
}

export default Header;
