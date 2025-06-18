"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

            <h2 className="text-3xl font-bold text-red-900">
              Create an Account
            </h2>
            <p className="text-amber-600 text-lg italic">
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
                placeholder="you@example.com"
                required
                className="focus-visible:ring-amber-500"
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
                  className="pr-10 focus-visible:ring-amber-500"
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
                  required
                  className="pr-10 focus-visible:ring-amber-500"
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-900 text-white hover:bg-red-800 text-lg font-semibold"
              size="lg"
            >
              Sign Up
            </Button>

            {/* Link to login */}
            <p className="text-center text-sm text-red-900">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-amber-600 hover:underline font-semibold"
              >
                Sign in here
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
