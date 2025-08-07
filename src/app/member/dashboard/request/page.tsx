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
import { RequestCertificateV2 } from "@/lib/supabase/actions/certificateV2";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const RequestPage = () => {
  const { data: churches, isLoading: isChurchLoading } = useGetAllChurches();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(RequestCertificateV2, {
    success: false,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success === true) {
      toast.success("Request submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["req-certificate"] });
      formRef.current?.reset();
    } else if (state?.errors) {
      toast.error("Request failed");
    }
  }, [state, queryClient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-amber-100 dark:border-amber-800/30 p-6 md:p-10 rounded-2xl shadow-lg">
        {/* Left: Certificate Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center"
        >
          <div className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 transition-transform hover:scale-105 hover:rotate-[-0.5deg] duration-300">
            <Image
              src="/cert.png"
              alt="Sample Baptism Certificate"
              width={500}
              height={420}
              priority
              className="rounded-xl shadow-md dark:shadow-amber-500/30 w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Request Form */}
        <form
          ref={formRef}
          action={formAction}
          className="space-y-5 flex flex-col justify-center"
        >
          <fieldset disabled={pending} className="space-y-4">
            {/* Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputBlock
                name="firstName"
                label="First Name"
                error={state?.errors?.firstName}
              />
              <InputBlock
                name="lastName"
                label="Last Name"
                error={state?.errors?.lastName}
              />
            </div>

            {/* Other Fields */}
            <InputBlock
              name="date_of_birth"
              label="Date of Birth"
              type="date"
              error={state?.errors?.date_of_birth}
            />
            <InputBlock
              name="father_fn"
              label="Father's Full Name"
              error={state?.errors?.father_fn}
            />
            <InputBlock
              name="mother_fn"
              label="Mother's Full Name"
              error={state?.errors?.mother_fn}
            />
            <InputBlock
              name="email"
              label="Email"
              type="email"
              error={state?.errors?.email}
            />

            {/* Church Dropdown */}
            <div className="space-y-1">
              <Label
                htmlFor="church_id"
                className="text-xs text-gray-600 dark:text-gray-400"
              >
                Select Church
              </Label>
              {isChurchLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Select name="church_id" required>
                  <SelectTrigger className="mt-1">
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
              {state?.errors?.church_id && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.church_id.join(", ")}
                </p>
              )}
            </div>

            <InputBlock
              name="member_id"
              label="Member ID"
              error={state?.errors?.member_id}
            />

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </fieldset>
        </form>
      </div>
    </motion.div>
  );
};

export default RequestPage;

/**
 * InputBlock for consistent field + label + error handling
 */
function InputBlock({
  name,
  label,
  type = "text",

  error,
}: {
  name: string;
  label: string;
  type?: string;

  error?: string[];
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-xs mt-3 text-gray-600">
        {label}
      </Label>
      <Input id={name} name={name} type={type} className="" />
      {error && <p className="text-red-500 text-xs mt-1">{error.join(", ")}</p>}
    </div>
  );
}
