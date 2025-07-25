"use server";

import {
  EmailTemplate,
  SendID,
  UpdatesCertificate,
} from "@/components/EmailTemplate";
import { MemberResend, ReqCertUpdateType } from "@/global/type";
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

export async function ReqCertUpdate({
  firstName,
  lastName,
  email,
  brgy,
}: ReqCertUpdateType) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid member email address provided.",
    };
  }

  console.log("Sending update req certificate email to:", email);

  const { error: resendError } = await resend.emails.send({
    from: "UCCP <support@wndl.dev>",
    to: [email],
    subject: "Baptism Certificate Request Update",
    react: UpdatesCertificate(firstName, lastName, brgy),
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

export async function SendMemberID({
  email,
  memberID,
}: {
  email: string;
  memberID: string;
}) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid member email address provided.",
    };
  }

  const { error: resendError } = await resend.emails.send({
    from: "UCCP <support@wndl.dev>",
    to: [email],
    subject: "Retrieve Member ID",
    react: SendID(memberID),
  });

  if (resendError) {
    console.error("Failed to send member id:", resendError.message);
    return {
      success: false,
      message: `Failed to send mmeber id: ${resendError.message}`,
    };
  }

  return {
    success: true,
    message: "Member ID sent successfully.",
  };
}
