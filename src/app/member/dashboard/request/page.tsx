"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export default function RequestPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    baptismDate: "",
    priest: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        <div className="space-y-4">
          {/* Name Fields */}
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
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* Baptism Date (optional) */}
          <div className="p-2">
            <Label
              htmlFor="baptismDate"
              className="text-xs text-muted-foreground px-1"
            >
              Baptism Date (optional)
            </Label>
            <Input
              id="baptismDate"
              name="baptismDate"
              type="date"
              value={formData.baptismDate}
              onChange={handleChange}
            />
          </div>

          {/* Priest */}
          <div className="p-2">
            <Label htmlFor="priest" className="text-xs text-muted-foreground">
              Presiding Priest (optional)
            </Label>
            <Input
              id="priest"
              name="priest"
              placeholder="Fr. Jose"
              value={formData.priest}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full cursor-pointer">
            Submit Request
          </Button>
        </div>
      </div>
    </div>
  );
}
