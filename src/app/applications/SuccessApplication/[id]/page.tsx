import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { GetApplicationID } from "@/lib/supabase/actions/member";

export default async function SuccessApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const res = await GetApplicationID(id);

  if (!res.success) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
      <div className="bg-amber-50 shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-yellow-300">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">
          Application Submitted!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you, {res?.data?.firstName ?? "Member"}, for applying to become
          a member of our church community.
        </p>
        <p className="text-gray-600 mb-4">
          We are truly blessed to welcome you with open arms and hearts.
        </p>
        <div className="text-sm text-gray-500 mb-6">
          Your application ID is:{" "}
          <span className="font-medium">{res?.data?.id}</span>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <p className="text-yellow-700 italic">
            “Therefore, if anyone is in Christ, he is a new creation. The old
            has passed away; behold, the new has come.” — 2 Corinthians 5:17
          </p>
        </div>
        <Link
          href="/"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
