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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-amber-50 dark:bg-red-950 shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-amber-300 dark:border-red-800 animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-amber-500 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold text-red-900 dark:text-amber-300 mb-2">
          Application Submitted!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Thank you, for applying to become a member of our church community.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We are truly blessed to welcome you with open arms and hearts.
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Your application ID is:{" "}
          <span className="font-medium text-red-800 dark:text-amber-300">
            {res?.data?.id}
          </span>
        </div>
        <div className="bg-amber-100 dark:bg-red-800 rounded-lg p-4 mb-6">
          <p className="text-amber-700 dark:text-amber-200 italic">
            “Therefore, if anyone is in Christ, he is a new creation. The old
            has passed away; behold, the new has come.” — 2 Corinthians 5:17
          </p>
        </div>
        <Link
          href="/"
          className="inline-block bg-amber-500 dark:bg-red-700 hover:bg-amber-600 dark:hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
