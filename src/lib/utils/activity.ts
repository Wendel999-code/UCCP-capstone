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

export async function GetAllActivity(page: number, pageSize: number) {
  try {
    const admin = await SuperAdmin();

    if (admin.role !== "super_admin") {
      return { success: false, data: [], count: 0 };
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from("activity_log")
      .select("*, Church:church_id(brgy)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { success: true, data, count: count ?? 0 };
  } catch (error) {
    console.error("Error in GetAllActivity:", error);
    return { success: false, data: [], count: 0 };
  }
}
