import { CertificateRequest } from "@/global/type";
import supabase from "../client";

export async function RequestCertificate(
  data: Omit<CertificateRequest, "id" | "status">
) {
  const { firstName, lastName, email, date_of_birth, church_id } = data;

  const requiredFields = {
    firstName,
    lastName,
    email,
    date_of_birth,
    church_id,
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
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser();

    if (userError || !currentUser) {
      throw userError || new Error("Unauthorized");
    }

    const { data: req, error } = await supabase
      .from("req_certificate")
      .insert([
        {
          firstName,
          lastName,
          email,
          date_of_birth,
          church_id,
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

// export async function GetReqCertificate() {
//   try {
//     const { churchAdmin: admin } = await getChurchAdmin();
//   } catch (error) {
//     console.log("error in get req certificate", error);
//     return [];
//   }
// }
