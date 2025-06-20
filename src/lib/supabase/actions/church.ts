import supabase from "../client";
import { getChurchAdmin } from "./dal";

export async function GetAllChurches() {
  try {
    const { data, error } = await supabase.from("Church").select("id,brgy");

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
    const admin = await getChurchAdmin();
    const { data, error: churchError } = await supabase
      .from("Church")
      .select("brgy")
      .eq("id", admin?.church_id)
      .single();

    if (churchError) throw churchError;

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
