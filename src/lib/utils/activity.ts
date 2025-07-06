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

    const { data, error } = await supabase
      .from("activity_log")
      .select("*,  Church:church_id(brgy)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.error("Error in GetAllActivity:", error);
    return [];
  }
}
