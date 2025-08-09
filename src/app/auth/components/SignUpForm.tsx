"use client";

import { useRedirectIfAuthenticated } from "@/app/hooks/useRedirectIfAuthenticated";
import LogoLoader from "@/components/LogoLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpV2 } from "@/lib/supabase/actions/authV2";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  Shield,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const { loading: userLoading, user } = useRedirectIfAuthenticated();

  // Animated background particles
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  if (userLoading || user) return <LogoLoader />;

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmpassword)
      return toast.error("Please fill out all fields.");
    if (password !== confirmpassword)
      return toast.error("Passwords don't match.");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await SignUpV2(email, password);
      if (!res.success) return toast.error(res.message);

      toast.success(res.message);
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };
  const isDisabled =
    loading || (password && confirmpassword && password !== confirmpassword);

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
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + particle.id * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-amber-500/90  to-amber-500/90 text-white p-12 relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-12 left-12 w-24 h-24 border border-white/20 rounded-full animate-spin"
                style={{ animationDuration: "25s" }}
              />
              <div className="absolute bottom-24 right-20 w-36 h-36 border border-white/10 rounded-full animate-pulse" />
              <div
                className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-bounce"
                style={{ animationDuration: "4s" }}
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
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Join CANA
              </span>
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-cyan-100 italic mt-3 text-center relative font-medium"
            >
              "Begin Your Journey"
            </motion.p>

            {/* Floating icons */}
            {[UserPlus, Shield, Sparkles].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + i * 30}%`,
                  bottom: `${10 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 15, 0],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7,
                }}
              >
                <Icon className="h-7 w-7 text-cyan-200" />
              </motion.div>
            ))}
          </div>

          {/* Right Panel - Enhanced Form */}
          <div className="flex-1 p-8 sm:p-12 space-y-6">
            {/* Mobile header - Enhanced */}
            <div className="lg:hidden text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-400/20 rounded-full blur-lg scale-150" />
                <Image
                  src="/uccp.jpg"
                  alt="CANA Circuit"
                  width={70}
                  height={70}
                  className="relative mx-auto rounded-full object-cover border-3 border-amber-500 shadow-xl"
                />
              </motion.div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-500  to-amber-500 bg-clip-text text-transparent">
                  Join CANA
                </h2>
                <p className="text-emerald-600 dark:text-teal-400 text-lg mt-2 italic font-medium">
                  "Begin Your Journey"
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
                Create Your Account
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join our community and start your spiritual journey
              </p>
            </motion.div>

            <form onSubmit={handleSignUp} className="space-y-5">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail
                    className={`absolute z-10 left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                      emailFocused ? "text-emerald-500" : "text-gray-400"
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
                    className={`h-12 pl-12 pr-4 border-2 transition-all duration-200 rounded-xl text-gray-800 dark:text-white bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm ${
                      emailFocused
                        ? "border-emerald-400 ring-2 ring-emerald-400/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Lock
                    className={`absolute z-10 left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                      passwordFocused ? "text-emerald-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    className={`h-12 pl-12 pr-12 border-2 transition-all duration-200 rounded-xl text-gray-800 dark:text-white bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm ${
                      passwordFocused
                        ? "border-emerald-400 ring-2 ring-emerald-400/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400"
                    }`}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength <= 2
                            ? "text-red-500"
                            : passwordStrength <= 3
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Enhanced Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 dark:text-gray-200 font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Shield
                    className={`absolute z-10 left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                      confirmFocused ? "text-emerald-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmFocused(true)}
                    onBlur={() => setConfirmFocused(false)}
                    required
                    className={`h-12 pl-12 pr-12 border-2 transition-all duration-200 rounded-xl text-gray-800 dark:text-white bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm ${
                      confirmFocused
                        ? "border-emerald-400 ring-2 ring-emerald-400/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400"
                    } ${confirmpassword && password !== confirmpassword ? "border-red-400 ring-red-400/20" : ""}`}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                </div>
                {confirmpassword && password !== confirmpassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    Passwords don't match
                  </motion.p>
                )}
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  type="submit"
                  disabled={!!isDisabled}
                  className="w-full h-12 text-lg font-semibold relative overflow-hidden group bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader className="animate-spin w-6 h-6" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </motion.div>

              {/* Enhanced Sign In Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <p className="text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-amber-600 dark:text-teal-400 hover:text-emerald-700 dark:hover:text-teal-300 font-semibold hover:underline transition-all duration-200 relative"
                  >
                    Sign in here
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300" />
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
