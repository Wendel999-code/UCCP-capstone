"use client";

import { useGetAllChurches } from "@/app/hooks/useChurch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestCertificate } from "@/lib/supabase/actions/certificate";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function RequestPage() {
  const [loading, setLoading] = useState(false);

  const { data: churches, isLoading } = useGetAllChurches();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date_of_birth: "",
    email: "",
    church_id: "",
    member_id: "",
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
        setFormData({
          firstName: "",
          lastName: "",
          date_of_birth: "",
          email: "",
          church_id: "",
          member_id: "",
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error in submit request:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-6 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg">
        {/* Left: Certificate Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <div className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 transition-transform hover:scale-105">
            <Image
              src="/cert.png"
              alt="Sample Baptism Certificate"
              width={500}
              height={420}
              priority
              className="rounded-md shadow-md dark:shadow-amber-500/20 w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                className="mt-1"
                id="firstName"
                name="firstName"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                className="mt-1"
                id="lastName"
                name="lastName"
                placeholder="Dela Cruz"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              className="mt-1"
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-1"
              id="email"
              name="email"
              type="email"
              placeholder="juan@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="church">Select Church</Label>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <Select
                value={formData.church_id}
                onValueChange={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    church_id: val,
                  }))
                }
                required
              >
                <SelectTrigger className="mt-1 rounded-md border px-3 py-2">
                  <SelectValue placeholder="Choose your church" />
                </SelectTrigger>
                <SelectContent>
                  {churches
                    ?.slice()
                    .sort((a, b) => a.brgy.localeCompare(b.brgy))
                    .map((church) => (
                      <SelectItem key={church.id} value={church.id}>
                        {church.brgy}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <Label htmlFor="MemberID">Member ID</Label>
            <Input
              className="mt-1"
              id="MemberID"
              name="member_id"
              type="text"
              placeholder="1234567890"
              value={formData.member_id}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-amber-700 hover:bg-amber-600 text-white w-full"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" /> Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
