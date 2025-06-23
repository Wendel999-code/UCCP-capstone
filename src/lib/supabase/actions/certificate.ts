import { CertificateRequest } from "@/global/type";
import supabase from "../client";

export async function RequestCertificate(
  data: Omit<CertificateRequest, "id" | "status">
) {
  const { firstName, lastName, email, date_of_birth, circuit } = data;

  const requiredFields = {
    firstName,
    lastName,
    email,
    date_of_birth,
    circuit,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Please fill out: ${missingFields.join(", ")}`,
    };
  }

  try {
    const { data: req, error } = await supabase
      .from("req_certificate")
      .insert([
        {
          firstName,
          lastName,
          email,
          date_of_birth,
          circuit,
        },
      ])
      .select("id")
      .single();

    if (error) throw error;

    return {
      success: true,
      message: "Request submitted successfully",
      data: req.id,
    };
  } catch (error) {
    console.error("Error in request certificate:", error);
    return {
      success: false,
      message: "Failed to request certificate",
    };
  }
}
