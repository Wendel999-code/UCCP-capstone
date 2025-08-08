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
import {
  Church,
  FileText,
  History,
  Loader,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import CertificatePreview from "./components/CertificatePreview";

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
      className="p-4 md:p-8 max-w-7xl mx-auto"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center pl-6 gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="h-8 w-8 text-amber-600" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Certificate Request
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Sparkles className="h-8 w-8 text-amber-600" />
            </motion.div>
          </div>

          <Link
            href="/member/dashboard/history"
            className=" hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-medium"
          >
            <History className="h-4 w-4" />
            View History
          </Link>
        </div>
        <p className="text-gray-600 text-sm dark:text-gray-500  max-w-2xl mx-auto">
          Request your baptism certificate by filling out the form below. We'll
          process your request and get back to you soon.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Certificate Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl blur-xl"></div>

            {/* Certificate preview container */}
            <div className="relative transition-all duration-500 hover:scale-105 hover:rotate-[-1deg] group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Certificate Preview Component */}
              <div className="relative">
                <CertificatePreview />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-20"
              >
                Official Document
              </motion.div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30 rounded-lg p-4 text-center"
            >
              <UserCheck className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                Member Verification
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Quick verification process
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200/50 dark:border-orange-700/30 rounded-lg p-4 text-center"
            >
              <Church className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                Church Records
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Access to official records
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Request Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col justify-center"
        >
          <div className="bg-gradient-to-br from-white/80 via-amber-50/60 to-orange-50/40 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/40 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/30 p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Request Form
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto"></div>
            </div>

            <form ref={formRef} action={formAction} className="space-y-6">
              <fieldset disabled={pending} className="space-y-5">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-amber-600" />
                    Personal Information
                  </h3>

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

                  <InputBlock
                    name="date_of_birth"
                    label="Date of Birth"
                    type="date"
                    error={state?.errors?.date_of_birth}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>
                </div>

                {/* Contact & Church Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Church className="h-5 w-5 text-amber-600" />
                    Contact & Church Information
                  </h3>

                  <InputBlock
                    name="email"
                    label="Email Address"
                    type="email"
                    error={state?.errors?.email}
                  />

                  <InputBlock
                    name="member_id"
                    label="Member ID"
                    error={state?.errors?.member_id}
                  />

                  {/* Enhanced Church Dropdown */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="church_id"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Select Your Church
                    </Label>
                    {isChurchLoading ? (
                      <Skeleton className="h-12 w-full rounded-lg" />
                    ) : (
                      <Select name="church_id" required>
                        <SelectTrigger className="h-12 bg-white/50 dark:bg-gray-800/50 border-amber-200/50 dark:border-amber-800/50 focus:border-amber-400 dark:focus:border-amber-600 transition-colors">
                          <SelectValue placeholder="Choose your church location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-800">
                          {churches
                            ?.slice()
                            .sort((a, b) => a.brgy.localeCompare(b.brgy))
                            .map((church) => (
                              <SelectItem
                                key={church.id}
                                value={church.id}
                                className="hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20"
                              >
                                {church.brgy}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                    {state?.errors?.church_id && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {state.errors.church_id.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full h-12 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-700 hover:via-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {pending ? (
                      <>
                        <Loader className="animate-spin mr-2 h-5 w-5" />
                        Processing Request...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Submit Certificate Request
                      </>
                    )}
                  </Button>
                </motion.div>
              </fieldset>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RequestPage;

/**
 * Enhanced InputBlock with better styling and animations
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <Label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        className="h-12 bg-white/50 dark:bg-gray-800/50 border-amber-200/50 dark:border-amber-800/50 focus:border-amber-400 dark:focus:border-amber-600 focus:ring-amber-400/20 dark:focus:ring-amber-600/20 transition-all duration-200"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error.join(", ")}
        </motion.p>
      )}
    </motion.div>
  );
}
