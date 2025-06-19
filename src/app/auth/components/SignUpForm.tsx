"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { SignUp } from "@/lib/supabase/actions/auth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Password don't matched.");
      return;
    }

    setLoading(true);

    try {
      const res = await SignUp(email, password);

      if (!res.success) {
        console.error("Sign up failed:", res.message);
        toast.error(res.message);
        return;
      }
      toast.success(res.message);

      router.push("/");
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-amber-50">
      {/* Left: Form */}
      <div className="flex">
        <div className="w-full md:w-1/2 px-8 py-16 space-y-6">
          <div className="text-center md:text-left space-y-2">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center gap-2 text-red-900 hover:underline mb-5"
            >
              <ArrowLeft size={18} />
              <span className="font-medium text-xs">Back to Home</span>
            </Link>

            <h2 className="text-3xl font-bold text-red-900 text-center">
              Create an Account
            </h2>
            <p className="text-amber-600 text-lg italic md:text-center">
              "Turning Water into Wine"
            </p>
          </div>

          <form className="space-y-6 max-w-md mx-auto md:mx-0">
            {/* Email */}
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
                className="focus-visible:ring-amber-500 text-black"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 focus-visible:ring-amber-500 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-2.5 right-3 text-red-700 hover:text-red-900"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
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
                  className="pr-10 focus-visible:ring-amber-500 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-2.5 right-3 text-red-700 hover:text-red-900"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              disabled={loading}
              onClick={handleSignUp}
              className="w-full bg-red-900 text-white hover:bg-red-800 text-lg font-semibold"
              size="lg"
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

            {/* Link to login */}
            <p className="text-center text-sm text-red-900">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-amber-600 hover:underline font-semibold"
              >
                Sign In here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Logo */}
        <div className="hidden md:flex items-center justify-center w-1/2 p-8">
          <div className="relative w-full max-w-md">
            <Image
              src="/logo.jpg"
              alt="Cana Circuit Logo"
              width={400}
              height={500}
              className="object-contain rounded-full shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
