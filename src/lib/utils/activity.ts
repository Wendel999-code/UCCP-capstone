import { ActivityLogPayload, ActivityLogResult } from "@/global/type";
import { getChurchAdmin, SuperAdmin } from "../supabase/actions/dal";
import supabase from "../supabase/client";

export async function InsertActivity({
  action,
  metadata,
}: ActivityLogPayload): Promise<ActivityLogResult> {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    const { error } = await supabase.from("activity_log").insert({
      church_id: admin.church_id,
      admin_id: admin.id,
      action,
      metadata: metadata || null,
    });

    if (error) throw error;

    return {
      success: true,
      message: "Activity logged successfully.",
    };
  } catch (error: any) {
    console.error("Error inserting activity log:", error);
    return {
      success: false,
      message: error.message || "Failed to log activity.",
    };
  }
}

export async function GetAllActivity() {
  try {
    const admin = await SuperAdmin();

    if (admin.role !== "super_admin") {
      return [];
    }

    // const today = new Date();
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, "0");
    // const day = String(today.getDate()).padStart(2, "0");

    // const start = `${year}-${month}-${day}T07:00:00`;
    // const end = `${year}-${month}-${day}T16:00:00`;

    const { data, error } = await supabase
      .from("activity_log")
      .select("*, Church:church_id(brgy)")
      // .gte("created_at", start)
      // .lte("created_at", end)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.error("Error in GetAllActivity:", error);
    return [];
  }
}
