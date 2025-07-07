import { Member } from "@/global/type";

import { InsertActivity } from "@/lib/utils/activity";
import { ResendEmail } from "@/lib/utils/resend";
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
    member_email,
    church_id,
    date_of_birth,
    marital_status,
  } = data;

  const requiredFields = {
    firstName,
    lastName,
    date_of_birth,
    age,
    address,
    gender,
    church_id,
    member_email,
    marital_status,
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
          member_email,
          marital_status,
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
      .order("created_at", { ascending: false });

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

export async function GetAllCountMembersByChurchId() {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    const { count, error } = await supabase
      .from("member")
      .select("id", { count: "exact", head: true })
      .eq("church_id", admin.church_id)
      .eq("activeStatus", "active");

    if (error) throw error;

    return count;
  } catch (error) {
    console.error("Error in GetAllCountMembersByChurchId:", error);
    return null;
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
      .select("id, firstName, lastName, member_email")
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

    const member = {
      firstName: updatedMember.firstName,
      lastName: updatedMember.lastName,
      church: church.brgy,
      memberID: updatedMember.id,
      member_email: updatedMember.member_email,
    };

    const res = await ResendEmail(member);

    await InsertActivity({
      action: "Approved Membership",
      metadata: {
        memberId: updatedMember.id,
        memberName: `${updatedMember.firstName} ${updatedMember.lastName}`,
        baptismDate: acceptanceOfDate,
        officiant,
        church: church.brgy,
      },
    });

    console.log("Membership approved:", updatedMember, data, res.message);

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
        .select("id, firstName, lastName")
        .single();

      if (error) throw error;

      console.log("Deleted member (church_admin):", deletedMember);

      await InsertActivity({
        action: "Deleted Member",
        metadata: {
          memberId: deletedMember.id,
          memberName: `${deletedMember.firstName} ${deletedMember.lastName}`,
        },
      });
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
      .neq("activeStatus", "pending");

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

export async function UpdateMemberByID(
  prevState: any,
  memberID: string,
  updatedData: Record<string, any>
) {
  try {
    const { churchAdmin: admin } = await getChurchAdmin();

    // Construct member update object, skipping undefined fields
    const memberUpdate: Record<string, any> = {
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      age: updatedData.age,
      gender: updatedData.gender,
      category: updatedData.category,
      address: updatedData.address,
      baptism_status: updatedData.baptism_status,
      marital_status: updatedData.marital_status,
      activeStatus: updatedData.activeStatus,
      member_email: updatedData.member_email,
    };

    if ("date_of_birth" in updatedData)
      memberUpdate.date_of_birth = updatedData.date_of_birth || null;

    if ("church_id" in updatedData)
      memberUpdate.church_id = updatedData.church_id || null;

    Object.keys(memberUpdate).forEach(
      (key) => memberUpdate[key] === undefined && delete memberUpdate[key]
    );

    const { data: updatedMember, error: updateError } = await supabase
      .from("member")
      .update(memberUpdate)
      .eq("id", memberID)
      .eq("church_id", admin.church_id)
      .select("id, firstName, lastName") // fetch for logging
      .single();

    if (updateError) throw updateError;

    // Handle baptismal record
    const { data: baptismExists, error: baptismCheckError } = await supabase
      .from("baptismal_record")
      .select("id")
      .eq("member_id", memberID)
      .eq("church_id", admin.church_id)
      .maybeSingle();

    if (baptismCheckError) throw baptismCheckError;

    if (baptismExists) {
      // Update baptismal record
      const { error: baptismUpdateError } = await supabase
        .from("baptismal_record")
        .update({
          fullName: `${updatedMember.lastName} ${updatedMember.firstName}`,
          baptism_date: updatedData.baptism_date || null,
          officiant: updatedData.officiant || null,
        })
        .eq("member_id", memberID)
        .eq("church_id", admin.church_id);

      if (baptismUpdateError) throw baptismUpdateError;
    } else if (updatedData.baptism_date || updatedData.officiant) {
      // Insert baptismal record
      const { error: baptismInsertError } = await supabase
        .from("baptismal_record")
        .insert({
          member_id: memberID,
          fullName: `${updatedMember.lastName} ${updatedMember.firstName}`,
          baptism_date: updatedData.baptism_date || null,
          officiant: updatedData.officiant || null,
          church_id: admin.church_id,
        });

      if (baptismInsertError) throw baptismInsertError;
    }

    // Insert activity log
    await InsertActivity({
      action: "Updated Member",
      metadata: {
        memberId: updatedMember.id,
        memberName: `${updatedMember.firstName} ${updatedMember.lastName}`,
        prevData: prevState,
        newData: updatedData,
      },
    });

    return {
      success: true,
      message: "Member updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating member:", error);
    return {
      success: false,
      message: error.message || "Failed to update member",
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
    const admin = await SuperAdmin();

    if (admin.role === "super_admin") {
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
    }

    return {
      success: false,
      message: "Unauthorized: insufficient permissions to get members",
      data: [],
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
    marital_status: formData.get("marital_status"),
    member_email: formData.get("member_email"),
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
    marital_status,
    member_email,
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
        marital_status,
        member_email,
      })
      .select("id")
      .single();

    if (memberError) throw memberError;

    const { error: CertError } = await supabase
      .from("baptismal_record")
      .insert({
        member_id: memberData.id,
        church_id: admin.church_id,
        circuit,
        baptism_date: baptismDate,
        officiant,
        fullName: `${lastName}  ${firstName}`,
      })

      .single();

    if (CertError) throw CertError;

    await InsertActivity({
      action: "Add Member",
      metadata: {
        member_id: memberData.id,
        church_id: admin.church_id,
        firstName,
        lastName,
      },
    });

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

export async function GetAllMemberPerChurchCount() {
  try {
    const superAdmin = await SuperAdmin();

    if (superAdmin.role !== "super_admin") {
      return {
        success: false,
        message: "Unauthorized: insufficient permissions to get member counts",
        data: [],
      };
    }

    const { data, error } = await supabase
      .from("member")
      .select("church_id")
      .neq("activeStatus", "pending");

    if (error) throw error;

    const counts: Record<string, number> = {};

    //loop church id para diri na dont need count member perchurch
    data.forEach((member) => {
      const churchId = member.church_id;

      if (churchId) {
        counts[churchId] = (counts[churchId] || 0) + 1;
      }
    });

    const { data: churches, error: churchError } = await supabase
      .from("Church")
      .select("id, brgy");

    if (churchError) throw churchError;

    const results = Object.entries(counts).map(([churchId, count]) => {
      const church = churches.find((c) => c.id === churchId);

      return {
        church_id: churchId,
        brgy: church?.brgy || "Unknown",
        member_count: count,
      };
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Error in GetAllMemberPerChurchCount:", error);
    return {
      success: false,
      message: "Failed to retrieve member counts",
      data: [],
    };
  }
}
