"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyForMembership } from "@/lib/supabase/actions/member";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type churchType = {
  id: string;
  brgy: string;
};

const MembershipForm = ({ churches }: { churches: churchType[] }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [address, setAddress] = useState("");
  const [church_id, setChurchId] = useState("");

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
        church_id,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div className="rounded-lg border bg-white p-8 shadow-md">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex text-[12px] items-center gap-2 text-yellow-600 hover:text-yellow-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-red-900" />
              <h1 className="text-3xl font-bold text-red-900">Cana Circuit</h1>
            </div>
            <h2 className="text-lg font-semibold text-amber-600 mb-2">
              Join Our Church Family
            </h2>
            <p className="text-gray-600 text-sm">
              We're excited that you're interested in becoming part of our
              church community. Please fill out this form to begin your
              membership journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset
              disabled={loading}
              className="space-y-6 opacity-100 disabled:opacity-50"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-500 text-[12px]"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 text-gray-700 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-500 text-[12px]"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-500 text-[12px]"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) =>
                      setAge(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-500 text-[12px]"
                  >
                    Gender
                  </label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Checkbox */}
              <div>
                <label className="block text-sm font-medium text-gray-500 text-[12px] mb-1">
                  Do you have children?
                </label>
                <div className="flex items-center gap-2 border">
                  <Checkbox
                    className="border border-gray-700"
                    id="hasChildren"
                    checked={hasChildren}
                    onCheckedChange={(checked) =>
                      setHasChildren(Boolean(checked))
                    }
                  />
                  <label htmlFor="hasChildren" className="text-sm">
                    Yes
                  </label>
                </div>
              </div>

              {/* Church Selection */}
              <div>
                <label
                  htmlFor="church"
                  className="block text-sm font-medium text-gray-500 text-[12px]"
                >
                  Select Circuit
                </label>
                <Select
                  value={church_id}
                  onValueChange={(val) => setChurchId(val)}
                >
                  <SelectTrigger className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
                    <SelectValue placeholder="Choose your church" />
                  </SelectTrigger>
                  <SelectContent className="z-50 max-h-64 overflow-y-auto">
                    {churches.length > 0 ? (
                      churches.map((church) => (
                        <SelectItem key={church.id} value={church.id}>
                          {church.brgy}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">
                        No churches found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-500 text-[12px]"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
                  placeholder="Brgy, Municipality, Province, State "
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-red-900 font-semibold"
              >
                {loading ? (
                  <>
                    {" "}
                    <Loader className="animate-spin" />
                    Submitting...{" "}
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              {message && (
                <p className="text-center text-sm text-red-500 mt-2">
                  {message}
                </p>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
