import { Member } from "@/global/type";

import { getChurchAdmin } from "./dal";
import supabase from "../client";

export async function ApplyForMembership(
  data: Omit<
    Member,
    | "id"
    | "created_at"
    | "Church"
    | "baptism_status"
    | "activeStatus"
    | "category"
  >
) {
  const { firstName, lastName, age, address, gender, hasChildren, church_id } =
    data;

  const requiredFields = {
    firstName,
    lastName,
    age,
    address,
    gender,
    church_id,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Please fill out: ${missingFields.join(", ")}`,
    };
  }

  let category = "";

  const Category = {
    CHILDREN: "CHILDREN",
    CYAF: "CYAF",
    CYF: "CYF",
    CWA: "CWA",
    UCM: "UCM",
  };

  if (age < 15) {
    category = Category.CHILDREN;
  } else if (age < 25) {
    category = Category.CYAF;
  } else if (age < 60 && hasChildren) {
    category = Category.CYF;
  } else if (age >= 60) {
    category = gender === "female" ? Category.CWA : Category.UCM;
  }

  try {
    const { data: newMember, error } = await supabase
      .from("member")
      .insert([
        {
          firstName,
          lastName,
          age,
          address,
          gender,
          church_id,
          category,
          activeStatus: "pending",
          hasChildren: hasChildren ?? false,
        },
      ])
      .select("id")
      .single();

    if (error) throw error;

    return {
      success: true,
      message: "Application submitted successfully",
      data: newMember.id,
    };
  } catch (error) {
    console.error("Error in ApplyForMembership:", error);
    return {
      success: false,
      message: "Failed to submit application",
    };
  }
}

export async function GetApplicationID(applicationId: string) {
  try {
    const admin = await getChurchAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*, Church:church_id(brgy)")
      .eq("id", applicationId)
      .eq("church_id", admin.church_id)
      .eq("activeStatus", "pending")
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in GetApplicationID:", error);
    return {
      success: false,
      message: "Failed to retrieve application",
    };
  }
}

// TODO GET ALL MEMBERS ONLY FOR SUPER ADMIN
export async function GetAllMembersByChurchId() {
  try {
    const admin = await getChurchAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*")
      .eq("church_id", admin.church_id) // dapat makuha la an same church both admin and member
      .neq("activeStatus", "pending")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in GetAllMembers:", error);
    return {
      success: false,
      message: "Failed to retrieve members",
      data: [],
    };
  }
}

export async function GetPendingApplicationsCount() {
  try {
    const admin = await getChurchAdmin();

    const { count, error: countError } = await supabase
      .from("member")
      .select("*", { count: "exact", head: true })
      .eq("activeStatus", "pending")
      .eq("church_id", admin.church_id);

    if (countError) throw countError;

    return {
      success: true,
      count: count || 0,
    };
  } catch (error) {
    console.error("Error getting pending applications count:", error);
    return {
      success: false,
      count: 0,
    };
  }
}

export async function GetPendingApplication() {
  try {
    const admin = await getChurchAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*")
      .eq("activeStatus", "pending")
      .eq("church_id", admin.church_id) // dapat makuha la an same church both admin and member
      .order("created_at", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error getting pending applications:", error);
    return {
      success: false,
      message: "Failed to retrieve pending applications",
      data: [],
    };
  }
}

export async function ApproveMembership(memberID: string) {
  if (!memberID) {
    return {
      success: false,
      message: "Member ID is required",
    };
  }

  try {
    const admin = await getChurchAdmin();

    const { data: updatedMember, error } = await supabase
      .from("member")
      .update({ activeStatus: "active", baptism_status: "Baptized" })
      .eq("id", memberID)
      .eq("church_id", admin.church_id)
      .select()
      .single();

    if (error) throw error;

    console.log("Membership approved:", updatedMember);

    return {
      success: true,
      message: "Membership approved successfully",
    };
  } catch (error) {
    console.error("Error approving membership:", error);
    return {
      success: false,
      message: "Failed to approve membership",
    };
  }
}

export async function DeleteMember(memberID: string) {
  if (!memberID) {
    return {
      success: false,
      message: "Member ID is required",
    };
  }

  try {
    const admin = await getChurchAdmin();

    const { data: deletedMember, error } = await supabase
      .from("member")
      .delete()
      .eq("id", memberID)
      .eq("church_id", admin.church_id)
      .select()
      .single();

    if (error) throw error;

    console.log("deleted member:", deletedMember);

    return {
      success: true,
      message: "Member deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting member :", error);
    return {
      success: false,
      message: "Failed to delete member",
    };
  }
}

export async function GetMemberByID(applicationId: string) {
  try {
    const admin = await getChurchAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*, Church:church_id(brgy)")
      .eq("id", applicationId)
      .eq("church_id", admin.church_id)
      .eq("activeStatus", "active")
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in getting member by id:", error);
    return {
      success: false,
      message: "Failed to retrieve member details",
    };
  }
}
