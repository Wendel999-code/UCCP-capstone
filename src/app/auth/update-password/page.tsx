"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdatePassword } from "@/lib/supabase/actions/authV2";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await UpdatePassword(password);

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
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-red-900 mb-4 text-center">
          Set New Password
        </h1>
        <form className="space-y-4 mt-5" onSubmit={handleUpdatePassword}>
          {/* New Password */}
          <div>
            <Label htmlFor="password" className="text-red-900">
              New Password
            </Label>
            <div className="relative mt-3">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="New secure password"
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
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-red-900">
              Confirm Password
            </Label>
            <div className="relative mt-3">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10 focus-visible:ring-amber-500 text-black dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 text-red-700 hover:text-red-900"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-white cursor-pointer mt-3 hover:bg-red-800 text-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
