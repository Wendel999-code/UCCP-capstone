import supabase from "../client";

// export async function PostTestimonial(desc: string) {
//   if (!desc) {
//     return { success: false, message: "Fill out the input fields first" };
//   }

//   try {
//     const { data } = await supabase.auth.getUser();

//     if (!data.user) {
//       return { success: false, message: "Unauthorized" };
//     }

//     const { error } = await supabase
//       .from("testimonial")
//       .insert({ description: desc, fullName: data.user?.email });

//     if (error) {
//       console.log("error in post testimonial", error);
//       return { success: false, message: "Failed to post testimonial" };
//     }

//     return { success: true, message: "Testimonial posted" };
//   } catch (error) {
//     console.log("error in post testimonial", error);
//     return { success: false, message: "Failed to post testimonial" };
//   }
// }

export async function GetTestimonial() {
  try {
    const { data, error } = await supabase
      .from("testimonial")
      .select("id,fullName, description, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("error in get testimonial", error);
      return { success: false, message: "Failed to get testimonial", data: [] };
    }

    return { success: true, message: "Testimonial fetched", data };
  } catch (error) {
    console.log("error in get testimonial", error);
    return { success: false, message: "Failed to get testimonial", data: [] };
  }
}
