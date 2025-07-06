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
      .select("id, role, church_id")
      .eq("id", currentUser.user.id)
      .single();

    if (adminError || churchAdmin?.role !== "church_admin") {
      throw adminError || new Error("Unauthorized access");
    }

    const { data: church, error: churchError } = await supabase
      .from("Church")
      .select("brgy")
      .eq("id", churchAdmin?.church_id)
      .single();

    if (churchError) throw churchError;

    return { churchAdmin, church };
  } catch (error) {
    console.log("error in fetching church admin", error);
    throw error;
  }
}

export async function SuperAdmin() {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser();

    if (userError || !currentUser) {
      throw userError || new Error("Unauthorized");
    }

    const { data: admin, error: adminError } = await supabase
      .from("User")
      .select("role")
      .eq("id", currentUser.user.id)
      .single();

    if (adminError || admin?.role !== "super_admin") {
      throw adminError || new Error("Unauthorized access");
    }

    return admin;
  } catch (error) {
    console.log("error in fetching super admin", error);
    throw error;
  }
}
