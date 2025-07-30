"use client";

import { useRedirectIfAuthenticated } from "@/app/hooks/useRedirectIfAuthenticated";
import LogoLoader from "@/components/LogoLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginV2 } from "@/lib/supabase/actions/authV2";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { loading: authLoading } = useRedirectIfAuthenticated();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await LoginV2(email, password);
      const { success, message } = res || {};

      if (!success) {
        toast.error(message || "Login failed");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success(message);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <LogoLoader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md md:max-w-2xl flex flex-col md:flex-row bg-white dark:bg-neutral-900 rounded-lg shadow-xl overflow-hidden"
      >
        {/* Left: Welcome Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-red-900 text-white w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center">
            Welcome to Cana Circuit
          </h2>
          <p className="text-amber-300 text-lg mt-2 italic text-center">
            "Turning Water into Wine"
          </p>
        </div>

        {/* Right: Form */}
        <div className="flex-1 p-8 sm:p-10 space-y-6">
          <div className="md:hidden text-center">
            <h2 className="text-3xl font-bold text-red-900">
              Welcome to Cana Circuit
            </h2>
            <p className="text-amber-600 text-lg mt-2 italic">
              "Turning Water into Wine"
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-red-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="focus-visible:ring-amber-500 text-black dark:text-white"
              />
            </div>

            {/* Password */}
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
                  className="pr-10 focus-visible:ring-amber-500 text-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-2.5 right-3 text-red-700 hover:text-red-900"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push("/auth/reset-password")}
                  className="text-sm cursor-pointer text-amber-600 hover:underline "
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 cursor-pointer text-white hover:bg-red-800 text-lg font-semibold"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-5 h-5" />
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Signup */}
            <p className="text-center text-sm text-red-900">
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-amber-600 hover:underline font-semibold"
              >
                Sign Up here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
