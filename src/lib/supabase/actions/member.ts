import supabase from "../client";

interface MembershipData {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  gender: string;
  hasChildren: boolean;
  churchId: string;
}

export async function ApplyForMembership(data: MembershipData) {
  const { firstName, lastName, age, address, gender, hasChildren, churchId } =
    data;

  const requiredFields = {
    firstName,
    lastName,
    age,
    address,
    gender,
    churchId,
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
      .from("Member")
      .insert([
        {
          firstName,
          lastName,
          age,
          address,
          gender,
          activeStatus: "pending",
          category: category,
          hasChildren: hasChildren ?? false,
          church_id: churchId,
        },
      ])
      .select()
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
    const { data, error } = await supabase
      .from("Member")
      .select("*, Church:church_id(brgy)")
      .eq("id", applicationId)
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

    const { data, error } = await supabase
      .from("Member")
      .select("*")
      .eq("church_id", churchAdmin.church_id) // dapat makuha la an same church both admin and member
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

    const { count, error: countError } = await supabase
      .from("Member")
      .select("*", { count: "exact", head: true })
      .eq("activeStatus", "pending")
      .eq("church_id", churchAdmin.church_id);

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

    const { data, error } = await supabase
      .from("Member")
      .select("*")
      .eq("activeStatus", "pending")
      .eq("church_id", churchAdmin.church_id) // dapat makuha la an same church both admin and member
      .order("created_at", { ascending: false });

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

    const { data: updatedMember, error } = await supabase
      .from("Member")
      .update({ activeStatus: "active" })
      .eq("id", memberID)
      .eq("church_id", churchAdmin.church_id)
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
