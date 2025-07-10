"use server";

import { createSupabaseServer } from "../server";

export async function PostTestimonialV2(desc: string) {
  if (!desc) {
    return { success: false, message: "Fill out the input fields first" };
  }

  const supabase = await createSupabaseServer();

  try {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return { success: false, message: "Unauthorized" };
    }

    const { error } = await supabase
      .from("testimonial")
      .insert({ description: desc, fullName: data.user?.email });

    if (error) {
      console.log("error in post testimonial", error);
      return { success: false, message: "Failed to post testimonial" };
    }

    return { success: true, message: "Testimonial posted" };
  } catch (error) {
    console.log("error in post testimonial", error);
    return { success: false, message: "Failed to post testimonial" };
  }
}
