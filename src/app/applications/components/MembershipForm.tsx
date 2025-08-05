"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { churchType } from "@/global/type";
import { ApplyForMembership } from "@/lib/supabase/actions/member";
import { calculateAge } from "@/lib/utils/age";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Church,
  Heart,
  Loader,
  Mail,
  MapPin,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MembershipForm = ({ churches }: { churches: churchType[] }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<string | "">("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [member_email, setMemberEmail] = useState("");
  const [church_id, setChurchId] = useState("");
  const [marital_status, setMaritalStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(member_email);

  const router = useRouter();

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Contact & Church", icon: Church },
    { id: 3, title: "Review & Submit", icon: CheckCircle },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const membershipData = {
        firstName,
        lastName,
        age,
        address,
        gender,
        marital_status,
        church_id,
        date_of_birth,
        member_email,
      };

      const result = await ApplyForMembership(membershipData);

      if (!result.success) {
        toast.error(result.message);
        setMessage(result.message);
        return;
      }

      toast.success("Application submitted successfully!");
      router.push(`/applications/SuccessApplication/${result.id}`);
    } catch (error) {
      toast.error("An error occurred while submitting your application");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    return firstName && lastName && date_of_birth && gender && marital_status;
  };

  const validateStep2 = () => {
    return member_email && church_id && address;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-amber-50 via-orange-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.1),transparent_40%)] dark:opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.08),transparent_40%)] dark:opacity-30"></div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 opacity-10 dark:opacity-5 "
      >
        <Sparkles className="h-32 w-32 text-amber-400" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 mt-22">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 dark:border-amber-800/30">
            <div className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                CANA Circuit
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Since 1948
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Church Family
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're excited that you're interested in becoming part of our church
            community. Please complete this application to begin your membership
            journey with us.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 md:space-x-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        currentStep >= step.id
                          ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="hidden md:block">
                      <p
                        className={`text-sm font-medium transition-colors ${
                          currentStep >= step.id
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-px w-8 md:w-12 transition-colors ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12"
        >
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentStep !== 3) {
                e.preventDefault();
              }
            }}
            className="space-y-8"
          >
            <fieldset
              disabled={loading}
              className="space-y-8 opacity-100 disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Personal Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Tell us about yourself
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <User className="h-4 w-4 text-amber-500" />
                          First Name
                        </label>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <User className="h-4 w-4 text-amber-500" />
                          Last Name
                        </label>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Calendar className="h-4 w-4 text-amber-500" />
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                          value={date_of_birth}
                          onChange={(e) => {
                            const dob = e.target.value;
                            setDateOfBirth(dob);
                            if (dob) {
                              const computedAge = calculateAge(dob);
                              setAge(computedAge ? String(computedAge) : "");
                            } else {
                              setAge("");
                            }
                          }}
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Calendar className="h-4 w-4 text-amber-500" />
                          Age
                        </label>
                        <Input
                          value={age}
                          readOnly
                          className="h-12 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Users className="h-4 w-4 text-amber-500" />
                          Gender
                        </label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Heart className="h-4 w-4 text-amber-500" />
                          Marital Status
                        </label>
                        <Select
                          value={marital_status}
                          onValueChange={setMaritalStatus}
                        >
                          <SelectTrigger className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl">
                            <SelectValue placeholder="Select your marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Separated">Separated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Contact & Church Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Contact & Church Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        How can we reach you and which church would you like to
                        join?
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Mail className="h-4 w-4 text-amber-500" />
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={member_email}
                          onChange={(e) => setMemberEmail(e.target.value)}
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                          placeholder="your.email@example.com"
                          required
                        />
                        {member_email && !isEmailValid && (
                          <p className="text-sm mt-3 text-red-500">
                            Invalid email format
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Church className="h-4 w-4 text-amber-500" />
                          Local Church
                        </label>
                        <Select value={church_id} onValueChange={setChurchId}>
                          <SelectTrigger className="h-12 border-gray-300 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400 rounded-xl">
                            <SelectValue placeholder="Choose your local church" />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {churches.length > 0 ? (
                              churches
                                .slice()
                                .sort((a, b) => a.brgy.localeCompare(b.brgy))
                                .map((church) => (
                                  <SelectItem key={church.id} value={church.id}>
                                    {church.brgy}
                                  </SelectItem>
                                ))
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                No churches found
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <MapPin className="h-4 w-4 text-amber-500" />
                          Complete Address
                        </label>
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="min-h-[120px] w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm focus:border-amber-400 focus:ring-amber-400 dark:bg-gray-800 dark:text-white resize-none"
                          placeholder="Please provide your complete address (Barangay, Municipality, Province, Country)"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Review Your Application
                      </h3>
                      <p className="text-gray-600 text-sm dark:text-gray-300">
                        Please review your information before submitting
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <User className="h-5 w-5 text-amber-500" />
                          Personal Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Name:</span>{" "}
                            {firstName} {lastName}
                          </p>
                          <p>
                            <span className="font-medium">Date of Birth:</span>{" "}
                            {date_of_birth}
                          </p>
                          <p>
                            <span className="font-medium">Age:</span> {age}
                          </p>
                          <p>
                            <span className="font-medium">Gender:</span>{" "}
                            {gender}
                          </p>
                          <p>
                            <span className="font-medium">Marital Status:</span>{" "}
                            {marital_status}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <Mail className="h-5 w-5 text-amber-500" />
                          Contact & Church
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {member_email}
                          </p>
                          <p>
                            <span className="font-medium">Local Church:</span>{" "}
                            {churches.find((c) => c.id === church_id)?.brgy ||
                              "Not selected"}
                          </p>
                          <p>
                            <span className="font-medium">Address:</span>{" "}
                            {address}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-amber-800 dark:text-amber-200">
                          <p className="font-medium mb-1">Important:</p>
                          <p>
                            By submitting this application, you agree to become
                            an active member of the CANA Circuit community. We
                            will review your application and contact you within
                            3-5 business days.
                          </p>
                        </div>
                      </div>
                    </div>

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl"
                      >
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                          <AlertCircle className="h-5 w-5" />
                          <p className="text-sm font-medium">{message}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20 rounded-xl"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                ) : (
                  ""
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !validateStep1()) ||
                      (currentStep === 2 && !validateStep2()) ||
                      (currentStep === 2 && !isEmailValid)
                    }
                    className={`px-8 py-3 ... cursor-pointer  ${!isEmailValid ? "disabled:cursor-not-allowed disabled:opacity-50 " : ""}`}
                  >
                    Next Step
                  </Button>
                ) : null}

                {currentStep === 3 && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 ... cursor-pointer"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Submit
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </fieldset>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipForm;
