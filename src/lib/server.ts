"use server";

import { EmailTemplate } from "@/components/EmailTemplate";
import { MemberResend } from "@/global/type";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function ResendEmail({
  firstName,
  lastName,
  church,
  memberID,
  member_email,
}: MemberResend) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!member_email || !emailRegex.test(member_email)) {
    return {
      success: false,
      message: "Invalid member email address provided.",
    };
  }

  console.log("Sending membership email to:", member_email);

  const { error: resendError } = await resend.emails.send({
    from: "UCCP <support@wndl.dev>",
    to: [member_email],
    subject: `Welcome, ${firstName}! Your UCCP Membership Details`,
    react: EmailTemplate(firstName, lastName, church, memberID),
  });

  if (resendError) {
    console.error("Failed to send email:", resendError.message);
    return {
      success: false,
      message: `Failed to send email: ${resendError.message}`,
    };
  }

  return {
    success: true,
    message: "Email sent successfully.",
  };
}
