"use client";

import { useRedirectIfAuthenticated } from "@/app/hooks/useRedirectIfAuthenticated";
import LogoLoader from "@/components/LogoLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginV2 } from "@/lib/supabase/actions/authV2";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { loading: authLoading, user } = useRedirectIfAuthenticated();

  // Animated background particles
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill out all fields.");

    setLoading(true);
    try {
      const res = await LoginV2(email, password);
      const { success, message } = res || {};
      if (!success) return toast.error(message || "Login failed");

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success(message);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) return <LogoLoader />;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + particle.id * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Left Panel - Enhanced */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-amber-500/90 via-orange-500/90 to-yellow-500/90 text-white p-12 relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <div className="absolute bottom-20 right-16 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
              <div
                className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-bounce"
                style={{ animationDuration: "3s" }}
              />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                bounce: 0.4,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150" />
              <Link href="/" className="relative block">
                <Image
                  src="/uccp.jpg"
                  alt="CANA Circuit"
                  width={100}
                  height={100}
                  className="relative rounded-full object-cover border-4 border-white/50 shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-5xl font-bold mt-6 leading-tight text-center relative"
            >
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                CANA Circuit
              </span>
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-yellow-100 italic mt-3 text-center relative font-medium"
            >
              "Turning Water into Wine"
            </motion.p>

            {/* Floating sparkles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 25}%`,
                  bottom: `${15 + i * 10}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <Sparkles className="h-6 w-6 text-yellow-200" />
              </motion.div>
            ))}
          </div>

          {/* Right Panel - Enhanced Form */}
          <div className="flex-1 p-8 sm:p-12 space-y-8">
            {/* Mobile header - Enhanced */}
            <div className="lg:hidden text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full blur-lg scale-150" />
                <Link href={"/"}>
                  {" "}
                  <Image
                    src="/uccp.jpg"
                    alt="CANA Circuit"
                    width={70}
                    height={70}
                    className="relative mx-auto rounded-full object-cover border-3 border-amber-500 shadow-xl"
                  />
                </Link>
              </motion.div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  CANA Circuit
                </h2>
                <p className="text-amber-600 dark:text-yellow-400 text-lg mt-2 italic font-medium">
                  "Turning Water into Wine"
                </p>
              </div>
            </div>

            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-2"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome Back
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to continue your journey
              </p>
            </motion.div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Enhanced Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-200 font-medium"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail
                    className={`absolute z-10 left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                      emailFocused ? "text-amber-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="you@example.com"
                    required
                    className={`h-14 pl-12 pr-4 xs:placeholder:text-[10px] border-2 transition-all duration-200 rounded-xl text-gray-800 dark:text-white bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm ${
                      emailFocused
                        ? "border-amber-400 ring-2 ring-amber-400/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-400"
                    }`}
                  />
                </div>
              </motion.div>

              {/* Enhanced Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-200 font-medium"
                >
                  Password
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Lock
                    className={`absolute z-10 left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                      passwordFocused ? "text-amber-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    className={`h-14 pl-12 pr-12 border-2 xs:placeholder:text-[10px]  transition-all duration-200 rounded-xl text-gray-800 dark:text-white bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm ${
                      passwordFocused
                        ? "border-amber-400 ring-2 ring-amber-400/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-400"
                    }`}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                </div>
                <div className="text-right">
                  <motion.button
                    type="button"
                    onClick={() => router.push("/auth/reset-password")}
                    className="text-sm text-amber-600 hover:text-amber-700 dark:text-yellow-400 dark:hover:text-yellow-300 hover:underline transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    Forgot your password?
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-lg font-semibold relative overflow-hidden group bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader className="animate-spin w-6 h-6" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </motion.div>

              {/* Enhanced Sign Up Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center"
              >
                <p className="text-gray-600 xs:text-[10px] dark:text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-amber-600 dark:text-yellow-400 hover:text-amber-700 dark:hover:text-yellow-300 font-semibold hover:underline transition-all duration-200 relative"
                  >
                    Create one here
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
