"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import supabase from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "email",
      });

      if (error) {
        console.error("Verification error:", error.message);
        toast.error("Invalid or expired OTP. Please try again.");
      } else {
        toast.success("Email verified successfully. You can now login");
        router.replace("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-amber-50 dark:bg-zinc-900">
      {/* Left: Form */}
      <div className="flex">
        <div className="w-full md:w-1/2 px-8 py-16 space-y-6">
          <div className="text-center md:text-left space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-red-900 hover:underline mb-5"
            >
              <span className="text-sm font-medium">← Back to Home</span>
            </Link>

            <h2 className="text-3xl font-bold text-red-900 dark:text-amber-400 text-center">
              Email Verification
            </h2>
            <p className=" text-white text-lg italic md:text-center">
              "Turning Water into Wine"
            </p>
          </div>

          <form className="space-y-6 max-w-md mx-auto md:mx-0">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-red-900 dark:text-amber-300">
                Enter the 6-digit OTP sent to your email
              </Label>
              <Input
                id="otp"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="123456"
                className="text-black dark:text-white focus-visible:ring-amber-500"
                required
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={loading || otp.length !== 6}
              className="w-full bg-red-900 text-white hover:bg-red-800 text-lg font-semibold"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-5 h-5" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <p className="text-center text-sm text-red-900 dark:text-amber-300">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => alert("Resend logic goes here")}
                className="text-amber-600 hover:underline font-semibold"
              >
                Resend OTP
              </button>
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
