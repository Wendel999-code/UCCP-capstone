// app/(auth)/signup/page.tsx
"use client";

import { useRedirectIfAuthenticated } from "@/app/hooks/useRedirectIfAuthenticated";
import LogoLoader from "@/components/LogoLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpV2 } from "@/lib/supabase/actions/authV2";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const { loading: userLoading, user } = useRedirectIfAuthenticated();

  if (userLoading || user) return <LogoLoader />;

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill out all fields.");
    if (password !== confirmpassword)
      return toast.error("Password don't matched.");

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden px-4 py-12"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-amber-400/20 to-orange-300/20 text-white p-10 relative">
          <div className="absolute -inset-2 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.05),transparent_50%)]" />
          <div className="absolute -inset-2 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.03),transparent_50%)]" />
          <Link href="/">
            {" "}
            <Image
              src="/uccp.jpg"
              alt="CANA Circuit"
              width={80}
              height={80}
              className="relative rounded-full object-cover border-4 border-white shadow-lg"
            />
          </Link>
          <h2 className="text-4xl font-bold mt-4 leading-tight text-center z-10 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-md text-yellow-500 italic mt-2 text-center z-10">
            "Turning Water into Wine"
          </p>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 right-6 opacity-10 z-0"
          >
            <Sparkles className="h-10 w-10 text-amber-400" />
          </motion.div>
        </div>

        <div className="flex-1 p-8 sm:p-10 space-y-8">
          <div className="md:hidden text-center">
            <Image
              src="/uccp.jpg"
              alt="CANA Circuit"
              width={50}
              height={50}
              className="mx-auto rounded-full object-cover border-2 border-amber-500 shadow-md"
            />
            <h2 className="text-3xl font-bold mt-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-yellow-500 text-lg mt-1 italic">
              "Turning Water into Wine"
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-red-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl text-black dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-red-900">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl text-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-red-700 hover:text-red-900"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-red-900">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 pr-10 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl text-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-3 right-3 text-red-700 hover:text-red-900"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-5 h-5" />
                  <span>Signing Up...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-center text-sm text-red-900">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-yellow-500 hover:underline font-semibold"
              >
                Sign In here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
