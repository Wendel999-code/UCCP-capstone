import supabase from "../client";

export async function GetAllChurches() {
  try {
    const { data, error } = await supabase.from("Church").select("*");

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching churches:", error);
    return {
      success: false,
      message: "Failed to fetch churches",
      data: [],
    };
  }
}

export async function ManageChurchById() {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser();

    if (userError || !currentUser) throw userError || new Error("Unauthorized");

    const { data: churchAdmin, error: adminError } = await supabase
      .from("User")
      .select("role, church_id")
      .eq("id", currentUser.user.id)
      .single();

    if (adminError || churchAdmin?.role !== "church_admin")
      throw adminError || new Error("Unauthorized access");

    const { data, error: churchError } = await supabase
      .from("Church")
      .select("brgy")
      .eq("id", churchAdmin?.church_id)
      .single();

    if (churchError) throw churchError;

    console.log("Church data:", data);
    console.log("Current User:", churchAdmin?.church_id);

    return {
      success: true,
      brgy: data.brgy,
    };
  } catch (error) {
    console.error("Error in Manage Church by Id:", error);
    return {
      success: false,
      brgy: null,
    };
  }
}
