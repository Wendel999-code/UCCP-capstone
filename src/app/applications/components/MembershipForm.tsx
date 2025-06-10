"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyForMembership } from "@/lib/supabase/supabaseServer/member";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MembershipForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const membershipData = {
        firstName,
        lastName,
        age: Number(age),
        address,
        gender,
        hasChildren,
      };

      const result = await ApplyForMembership(membershipData);

      if (!result.success) {
        toast.error(result.message);
        setMessage(result.message);
        return;
      }

      toast.success("Application submitted successfully!");

      router.push(`/applications/SuccessApplication/${result.data}`);
    } catch (error) {
      toast.error("An error occurred while submitting your application");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="max-w-2xl w-full space-y-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex mr-[23rem] md:mr-[30rem] items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4 mt-4">
              <Heart className="h-8 w-8 text-yellow-500" />
              <h1 className="text-3xl font-bold text-gray-900">
                Lester's Church
              </h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Join Our Church Family
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're excited that you're interested in becoming part of our
              church community. Please fill out this form to begin your
              membership journey with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium leading-none"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium leading-none"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium leading-none">
                Age
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="text-sm font-medium leading-none"
              >
                Gender
              </label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="hasChildren"
                className="text-sm font-medium leading-none"
              >
                Do you have children?
              </label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasChildren"
                  checked={hasChildren}
                  onCheckedChange={(checked) =>
                    setHasChildren(Boolean(checked))
                  }
                />
                <label
                  htmlFor="hasChildren"
                  className="text-sm font-medium leading-none"
                >
                  Yes
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium leading-none"
              >
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Brgy, Municipality, Province, State, Zip Code"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>

            {message && (
              <p className="text-center text-sm mt-2 text-red-500">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
