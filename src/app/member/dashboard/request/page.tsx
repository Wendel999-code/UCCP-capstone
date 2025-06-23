"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RequestCertificate } from "@/lib/supabase/actions/certificate";
import { Loader } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function RequestPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date_of_birth: "",
    email: "",
    circuit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await RequestCertificate(formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("error in submit request", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white dark:bg-zinc-900 p-6 rounded-lg shadow">
        {/* Left: Certificate Image */}
        <div className="flex justify-center">
          <Image
            src="/cert.png"
            alt="Sample Baptism Certificate"
            width={500}
            height={420}
            className="rounded-md shadow-md mt-5"
          />
        </div>

        {/* Right: Form */}
        <fieldset disabled={loading}>
          <div className="space-y-4">
            <div className="p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-xs text-muted-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-xs text-muted-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Dela Cruz"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="p-2">
              <Label
                htmlFor="dateOfBirth"
                className="text-xs text-muted-foreground px-1"
              >
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="p-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Circuit */}
            <div className="p-2">
              <Label
                htmlFor="circuit"
                className="text-xs text-muted-foreground"
              >
                Circuit
              </Label>
              <Input
                id="circuit"
                name="circuit"
                placeholder="Example: Palanit"
                value={formData.circuit}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white w-full cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2 h-4 w-4" /> Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
