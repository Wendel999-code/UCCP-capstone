"use client";

import Header from "@/app/landing/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPassword } from "@/lib/supabase/actions/authV2";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await ResetPassword(email);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-red-900 mb-4 text-center">
            Reset Your Password
          </h1>
          <form className="space-y-4 mt-5" onSubmit={handleResetPassword}>
            <div>
              <Label htmlFor="email" className="text-gray-700  text-[12px]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible:ring-amber-500 text-black mt-2 dark:text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-900 mt-5 cursor-pointer text-white hover:bg-red-800 text-lg font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
