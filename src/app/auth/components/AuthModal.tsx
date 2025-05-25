"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { EyeIcon } from "lucide-react";
import { Login, SignUp } from "@/lib/supabase/supabaseServer/auth";
import { toast } from "react-toastify";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleView = () => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setView(view === "login" ? "signup" : "login");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await Login(email, password);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const res = await SignUp(email, password);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 text-yellow-700 hover:bg-yellow-600 text-md px-4 flex gap-2 items-center">
          {view === "login" ? "Login" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-yellow-50 max-w-md rounded-lg border border-yellow-200">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-yellow-700 text-center">
            NorWesCom Church
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {view === "login" ? (
            <>
              <h1 className="text-xl font-bold text-yellow-700 text-center">
                Login
              </h1>
              <motion.form
                key="login"
                onSubmit={handleLogin}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="email" className="text-yellow-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-yellow-800">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <EyeIcon
                      className="absolute top-2 right-2 h-5 w-5 text-yellow-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 font-bold text-lg"
                  >
                    Login
                  </Button>
                </DialogFooter>

                <p className="text-center text-sm mt-2">
                  Don't have an account?{" "}
                  <span
                    onClick={toggleView}
                    className="text-yellow-700 font-semibold cursor-pointer hover:underline"
                  >
                    Sign up here
                  </span>
                </p>
              </motion.form>
            </>
          ) : (
            <>
              {" "}
              <h1 className="text-xl font-bold text-yellow-700 text-center">
                Sign Up
              </h1>
              <motion.form
                key="signup"
                onSubmit={handleSignUp}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="email" className="text-yellow-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-yellow-800">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-yellow-800">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center font-medium">
                    {error}
                  </p>
                )}

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600  font-semibold"
                  >
                    Create Account
                  </Button>
                </DialogFooter>

                <p className="text-center text-sm mt-2">
                  Already have an account?{" "}
                  <span
                    onClick={toggleView}
                    className="text-yellow-700 font-semibold cursor-pointer hover:underline"
                  >
                    Login here
                  </span>
                </p>
              </motion.form>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
