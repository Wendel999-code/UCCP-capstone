import supabase from "../client";

export async function getChurchAdmin() {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser();

    if (userError || !currentUser) {
      throw userError || new Error("Unauthorized");
    }

    const { data: churchAdmin, error: adminError } = await supabase
      .from("User")
      .select("role, church_id")
      .eq("id", currentUser.user.id)
      .single();

    if (adminError || churchAdmin?.role !== "church_admin") {
      throw adminError || new Error("Unauthorized access");
    }

    return churchAdmin;
  } catch (error) {
    console.log("error in fetching church admin", error);
    throw error;
  }
}
