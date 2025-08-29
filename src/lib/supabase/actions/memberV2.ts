import supabase from "../client";
import { getChurchAdmin, SuperAdmin } from "./dal";

export async function GetMembersByChurchId(
  page?: number,
  pageSize?: number,
  search?: string,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "asc",
  category?: string
) {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    let query = supabase
      .from("member")
      .select("*, Church:church_id(brgy)", { count: "exact" })
      .eq("church_id", admin.church_id)
      .neq("activeStatus", "pending");

    if (search) {
      const terms = search.trim().split(/\s+/); // split by spaces
      const conditions: string[] = [];

      terms.forEach((term) => {
        conditions.push(`firstName.ilike.%${term}%`);
        conditions.push(`lastName.ilike.%${term}%`);
      });

      query = query.or(conditions.join(","));
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (sortBy) {
      query = query.order(sortBy, { ascending: sortOrder === "asc" });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    if (page !== undefined && pageSize !== undefined) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { success: true, data, count: count ?? 0 };
  } catch (error) {
    console.error("GetMembersByChurchId error:", error);
    return { success: false, data: [], count: 0 };
  }
}

export async function GetAllMembersBySuperAdmin(
  page?: number,
  pageSize?: number,
  search?: string,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "asc",
  category?: string,
  circuit?: string
) {
  try {
    const admin = await SuperAdmin();

    if (admin.role !== "super_admin") {
      return { success: false, data: [], count: 0 };
    }

    let query = supabase
      .from("member")
      .select("*, Church:church_id(brgy)", { count: "exact" })
      .neq("activeStatus", "pending");

    if (search) {
      const terms = search.trim().split(/\s+/); // split 
      const conditions: string[] = [];

      terms.forEach((term) => {
        conditions.push(`firstName.ilike.%${term}%`);
        conditions.push(`lastName.ilike.%${term}%`);
      });

      query = query.or(conditions.join(","));
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (circuit) {
      query = query.eq("church_id", circuit);
    }

    if (sortBy) {
      query = query.order(sortBy, { ascending: sortOrder === "asc" });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    if (page !== undefined && pageSize !== undefined) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { success: true, data, count: count ?? 0 };
  } catch (error) {
    console.error("Error in GetAllMembers in super_admin:", error);
    return {
      success: false,
      message: "Failed to retrieve members in super_admin",
      data: [],
    };
  }
}
