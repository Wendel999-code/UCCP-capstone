import { Member } from "@/global/type";

import supabase from "../client";
import { memberSchema } from "../validation/member";
import { getChurchAdmin, SuperAdmin } from "./dal";

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
  const {
    firstName,
    lastName,
    age,
    address,
    gender,
    hasChildren,
    church_id,
    date_of_birth,
  } = data;

  const requiredFields = {
    firstName,
    lastName,
    date_of_birth,
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

  if (age < 17) {
    category = Category.CHILDREN;
  } else if (age < 25) {
    category = Category.CYF;
  } else if (age < 60) {
    category = Category.CYAF;
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
          date_of_birth,
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
      id: newMember.id,
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
    const { churchAdmin: admin } = await getChurchAdmin();

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

export async function GetNewMemberID(applicationId: string) {
  try {
    const { data, error } = await supabase
      .from("member")
      .select("id")
      .eq("id", applicationId)
      .eq("activeStatus", "pending")
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in  GetNewMemberID:", error);
    return {
      success: false,
      message: "Failed to retrieve new member ID",
    };
  }
}

export async function GetAllMembersByChurchId() {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*, Church:church_id(brgy)")
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
    const { churchAdmin: admin } = await getChurchAdmin();

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
    const { churchAdmin: admin } = await getChurchAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*, Church:church_id(brgy)")
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

export async function ApproveMembership(
  memberID: string,
  acceptanceOfDate: string,
  officiant: string
) {
  if (!memberID || !acceptanceOfDate || !officiant) {
    return {
      success: false,
      message: " All fields is required",
    };
  }

  try {
    const { churchAdmin, church } = await getChurchAdmin();

    const { data: updatedMember, error } = await supabase
      .from("member")
      .update({ activeStatus: "active", baptism_status: "Baptized" })
      .eq("id", memberID)
      .eq("church_id", churchAdmin.church_id)
      .select("id, firstName, lastName")
      .single();

    if (error) throw error;

    const { data, error: baptismError } = await supabase
      .from("baptismal_record")
      .insert([
        {
          fullName: `${updatedMember.lastName} ${updatedMember.firstName}`,
          member_id: updatedMember.id,
          baptism_date: acceptanceOfDate,
          officiant,
          circuit: church.brgy,
          church_id: churchAdmin.church_id,
        },
      ])
      .select()
      .single();

    if (baptismError) throw baptismError;

    console.log("Membership approved:", updatedMember, data);

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
    const { churchAdmin: admin } = await getChurchAdmin();

    if (admin.role === "church_admin") {
      const { data: deletedMember, error } = await supabase
        .from("member")
        .delete()
        .eq("id", memberID)
        .eq("church_id", admin.church_id)
        .single();

      if (error) throw error;

      console.log("Deleted member (church_admin):", deletedMember);

      return {
        success: true,
        message: "Member deleted successfully",
      };
    }

    return {
      success: false,
      message: "Unauthorized: insufficient permissions to delete member",
    };
  } catch (error) {
    console.error("Error deleting member:", error);
    return {
      success: false,
      message: "Failed to delete member",
    };
  }
}

export async function GetMemberByID(MemberID: string) {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    let query = supabase
      .from("member")
      .select("*, Church:church_id(brgy)")
      .eq("id", MemberID)
      .eq("activeStatus", "active");

    if (admin.role === "church_admin") {
      query = query.eq("church_id", admin.church_id);
    }

    const { data, error } = await query.single();

    if (error) throw error;

    const { data: baptism_record, error: baptismError } = await supabase
      .from("baptismal_record")
      .select("baptism_date , officiant")
      .eq("member_id", MemberID)
      .maybeSingle();

    if (baptismError) throw baptismError;

    return {
      success: true,
      data: { ...data, ...baptism_record },
    };
  } catch (error) {
    console.error("Error in getting member by id:", error);
    return {
      success: false,
      message: "Failed to retrieve member details",
    };
  }
}

export async function GetMemberByIDBySuperAdmin(memberID: string) {
  if (!memberID) {
    return {
      success: false,
      message: "Member ID is required",
    };
  }

  try {
    const admin = await SuperAdmin();

    console.log("Admin role:", admin.role);

    if (admin.role === "super_admin") {
      const { data, error } = await supabase
        .from("member")
        .select("*, Church:church_id(brgy)")
        .eq("id", memberID)
        .eq("activeStatus", "active")
        .single();

      if (error) throw error;

      const { data: baptism_record, error: baptismError } = await supabase
        .from("baptismal_record")
        .select("baptism_date, officiant")
        .eq("member_id", memberID)
        .maybeSingle();

      if (baptismError) throw baptismError;

      return {
        success: true,
        data: { ...data, ...baptism_record },
      };
    }

    return {
      success: false,
      message: "Unauthorized: insufficient permissions to get member details",
    };
  } catch (error) {
    console.error("Error in getting member by id:", error);
    return {
      success: false,
      message: "Failed to retrieve member details",
    };
  }
}

export async function GetAllMembersBySuperAdmin() {
  try {
    await SuperAdmin();

    const { data, error } = await supabase
      .from("member")
      .select("*, Church:church_id(brgy)")
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

export async function addMemberAction(
  initialState: unknown,
  formData: FormData
) {
  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    age: formData.get("age"),
    date_of_birth: formData.get("date_of_birth"),
    gender: formData.get("gender"),
    category: formData.get("category"),
    address: formData.get("address"),
    church_id: formData.get("church_id"),
    circuit: formData.get("circuit"),
    baptismDate: formData.get("baptismDate"),
    officiant: formData.get("officiant"),
  };

  const parsed = memberSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const {
    firstName,
    lastName,
    age,
    date_of_birth,
    gender,
    category,
    address,
    church_id,
    baptismDate,
    officiant,
    circuit,
  } = parsed.data;

  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    const { data: memberData, error: memberError } = await supabase
      .from("member")
      .insert({
        firstName,
        lastName,
        age,
        date_of_birth,
        gender,
        category,
        address,
        church_id,
        activeStatus: "active",
        baptism_status: "Baptized",
      })
      .eq("church_id", admin.church_id)
      .select("id")
      .single();

    if (memberError) throw memberError;

    const { data: CertData, error: CertError } = await supabase
      .from("baptismal_record")
      .insert({
        member_id: memberData.id,
        church_id: admin.church_id,
        circuit,
        baptism_date: baptismDate,
        officiant,
        fullName: `${lastName}  ${firstName}`,
      })
      .eq("church_id", admin.church_id)
      .single();

    if (CertError) throw CertError;

    return { success: true };
  } catch (error) {
    console.log("error in add member action", error);
    return;
  }
}

export async function DeleteMemberBySuperAdmin(memberID: string) {
  if (!memberID) {
    return {
      success: false,
      message: "Member ID is required",
    };
  }

  try {
    const admin = await SuperAdmin();

    if (admin.role === "super_admin") {
      const { data: deletedMember, error } = await supabase
        .from("member")
        .delete()
        .eq("id", memberID)
        .single();

      if (error) throw error;

      console.log("Deleted member (super_admin):", deletedMember);

      return {
        success: true,
        message: "Member deleted successfully",
      };
    }

    return {
      success: false,
      message: "Unauthorized: insufficient permissions to delete member",
    };
  } catch (error) {
    console.error("Error deleting member:", error);
    return {
      success: false,
      message: "Failed to delete member",
    };
  }
}
