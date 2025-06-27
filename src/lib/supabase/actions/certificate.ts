import { CertificateRequest } from "@/global/type";
import supabase from "../client";
import { getChurchAdmin } from "./dal";

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


    //Todo fix this kasi pwede login kala pero diri ka member

    const { data: req, error } = await supabase
      .from("req_certificate")
      .insert([
        {
          firstName,
          lastName,
          email,
          date_of_birth,
          church_id,
          member_id: currentUser.user.id,
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

//TODO IMPLMENT LATER FILTER STATUS
export async function GetReqCertificate() {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    const { data, error } = await supabase
      .from("req_certificate")
      .select("*, Church:church_id(brgy)")
      .eq("church_id", admin.church_id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      message: "Request fetched successfully",
      data,
    };
  } catch (error) {
    console.log("error in get req certificate", error);
    return {
      success: false,
      message: "Failed to retrieve request certificate",
      data: [],
    };
  }
}

// export async function GetReqCertificateByID(reqId: string) {
//   if (!reqId) {
//     return;
//   }

//   try {
//     const { churchAdmin: admin } = await getChurchAdmin();

//     const { data: certificate, error: certError } = await supabase
//       .from("req_certificate")
//       .select("member_id")
//       .eq("id", reqId)
//       .eq("church_id", admin.church_id)
//       .single();

//     if (certError) throw certError;

//     if (!certificate?.member_id)
//       throw new Error("No member ID found in certificate");

//     const { data: member, error: memberError } = await supabase
//       .from("member")
//       .select("firstName, lastName,  date_of_birth")
//       .eq("id", certificate.member_id)
//       .single();

//     if (memberError) throw memberError;

//     const { data: baptismalRecord, error: baptismalError } = await supabase
//       .from("baptismal_record")
//       .select("baptism_date, officiant, circuit")
//       .eq("member_id", certificate.member_id)
//       .single();

//     if (baptismalError) throw baptismalError;

//     console.log("baptismalRecord", baptismalRecord);
//     console.log("member", member);

//     return {
//       baptism_date: baptismalRecord?.baptism_date ?? "",
//       officiant: baptismalRecord?.officiant ?? "",
//       circuit: baptismalRecord?.circuit ?? "",
//       firstName: member?.firstName ?? "",
//       lastName: member?.lastName ?? "",
//       date_of_birth: member?.date_of_birth ?? "",
//     };
//   } catch (error) {
//     console.error("error in get req by id", error);
//     return;
//   }
// }
