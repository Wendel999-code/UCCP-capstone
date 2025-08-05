import { GetNewMemberID } from "@/lib/supabase/actions/member";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SuccessApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const res = await GetNewMemberID(id);

  if (!res.success) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/30 rounded-2xl shadow-2xl p-8 text-center animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-amber-500 dark:text-amber-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-red-900 dark:text-amber-300 mb-4">
          Application Submitted!
        </h1>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2">
          Thank you for applying to become a member of our church community.
        </p>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
          We are truly blessed to welcome you with open arms and hearts.
        </p>

        <div className="text-sm text-amber-800 dark:text-amber-300 font-medium mb-8">
          Your Application ID:
          <div className="mt-2 text-lg bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl py-2 px-4 inline-block border border-amber-300 dark:border-amber-700">
            {res?.data?.id}
          </div>
        </div>

        <div className="bg-white/90 dark:bg-red-800/30 backdrop-blur-sm border border-amber-200/30 dark:border-amber-800/30 rounded-xl p-5 mb-6">
          <p className="text-amber-700 dark:text-amber-200 text-sm italic">
            “Therefore, if anyone is in Christ, he is a new creation. The old
            has passed away; behold, the new has come.” — 2 Corinthians 5:17
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
