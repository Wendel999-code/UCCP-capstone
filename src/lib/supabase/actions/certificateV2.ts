"use server";

import { createSupabaseServer } from "../server";
import { certificateRequestSchema } from "../validation/certificate";

export async function RequestCertificateV2(
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
    const supabase = await createSupabaseServer();

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
