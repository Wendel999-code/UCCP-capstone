import { GetReqCertificateResponse } from "@/global/type";
import supabase from "../client";
import { certificateRequestSchema } from "../validation/certificate";
import { getChurchAdmin } from "./dal";

export async function RequestCertificate(
  initialState: unknown,
  formdata: FormData
) {
  const raw = {
    firstName: formdata.get("firstName"),
    lastName: formdata.get("lastName"),
    email: formdata.get("email"),
    date_of_birth: formdata.get("date_of_birth"),
    church_id: formdata.get("church_id"),
    member_id: formdata.get("member_id"),
    father_fn: formdata.get("father_fn"),
    mother_fn: formdata.get("mother_fn"),
  };

  const parsed = certificateRequestSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const {
    firstName,
    lastName,
    email,
    date_of_birth,
    church_id,
    member_id,
    father_fn,
    mother_fn,
  } = parsed?.data;

  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser();

    if (userError || !currentUser) {
      throw userError;
    }

    //Todo fix this kasi pwede login kala pero diri ka member
    const { error } = await supabase
      .from("req_certificate")
      .insert([
        {
          firstName,
          lastName,
          email,
          date_of_birth,
          church_id,
          member_id,
          father_fn,
          mother_fn,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in request certificate:", error);
    return { success: false, error: error };
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
      .order("created_at", { ascending: false });

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

export async function GetReqCertificateByID(
  reqId: string
): Promise<GetReqCertificateResponse> {
  if (!reqId) {
    return { success: false, error: "Request ID is required", data: null };
  }

  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    // Fetch certificate
    const { data: certificate, error: certError } = await supabase
      .from("req_certificate")
      .select("member_id, father_fn, mother_fn")
      .eq("id", reqId)
      .eq("church_id", admin.church_id)
      .single();

    if (certError) {
      console.error("Error fetching certificate:", certError);
      return { success: false, error: certError.message, data: null };
    }

    if (!certificate?.member_id) {
      return {
        success: false,
        error: "No member ID found in certificate",
        data: null,
      };
    }

    // Fetch member
    const { data: member, error: memberError } = await supabase
      .from("member")
      .select("firstName, lastName, date_of_birth")
      .eq("id", certificate.member_id)
      .single();

    if (memberError) {
      console.error("Error fetching member:", memberError);
      return { success: false, error: memberError.message, data: null };
    }

    // Fetch baptismal record
    const { data: baptismalRecord, error: baptismalError } = await supabase
      .from("baptismal_record")
      .select("baptism_date, officiant, circuit")
      .eq("member_id", certificate.member_id)
      .single();

    if (baptismalError) {
      console.error("Error fetching baptismal record:", baptismalError);
      return { success: false, error: baptismalError.message, data: null };
    }

    const responseData = {
      baptism_date: baptismalRecord?.baptism_date ?? "",
      officiant: baptismalRecord?.officiant ?? "",
      circuit: baptismalRecord?.circuit ?? "",
      firstName: member?.firstName ?? "",
      lastName: member?.lastName ?? "",
      date_of_birth: member?.date_of_birth ?? "",
      father_fn: certificate?.father_fn ?? "",
      mother_fn: certificate?.mother_fn ?? "",
    };

    console.log("GetReqCertificateByID success:", responseData);

    return { success: true, data: responseData, error: null };
  } catch (error) {
    console.error("Unhandled error in GetReqCertificateByID:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      data: null,
    };
  }
}
