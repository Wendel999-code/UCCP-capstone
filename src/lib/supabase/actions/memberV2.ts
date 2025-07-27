import supabase from "../client";
import { getChurchAdmin, SuperAdmin } from "./dal";

export async function GetMembersByChurchId(
  page: number,
  pageSize: number,
  search: string,
  sortBy: string,
  sortOrder: "asc" | "desc",
  category: string
) {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("member")
      .select("*, Church:church_id(brgy)", { count: "exact" })
      .eq("church_id", admin.church_id)
      .neq("activeStatus", "pending");

    if (search) {
      query = query.or(
        `firstName.ilike.%${search}%,lastName.ilike.%${search}%`
      );
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (sortBy) {
      query = query.order(sortBy, { ascending: sortOrder === "asc" });
    } else {
      query = query.order("created_at", { ascending: true });
    }

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    return { success: true, data, count: count ?? 0 };

    
  } catch (error) {
    console.error("GetMembersByChurchId error:", error);
    return { success: false, data: [], count: 0 };
  }
}

export async function GetAllMembersBySuperAdmin(
  page: number,
  pageSize: number,
  search: string,
  sortBy: string,
  sortOrder: "asc" | "desc",
  category: string,
  circuit: string
) {
  console.log("params", category, page, pageSize, search, sortBy, sortOrder);

  try {
    const admin = await SuperAdmin();

    if (admin.role !== "super_admin") {
      return { success: false, data: [], count: 0 };
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("member")
      .select("*, Church:church_id(brgy)", { count: "exact" })
      .neq("activeStatus", "pending");

    if (search) {
      query = query.or(
        `firstName.ilike.%${search}%,lastName.ilike.%${search}%`
      );
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
      query = query.order("created_at", { ascending: true });
    }

    const { data, error, count } = await query.range(from, to);

    console.log("data", data);

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
