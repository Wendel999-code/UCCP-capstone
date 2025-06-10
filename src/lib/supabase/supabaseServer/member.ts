import supabase from "../supabaseClient/supabaseClient";

interface MembershipData {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  gender: string;
  hasChildren: boolean;
}

export async function ApplyForMembership(data: MembershipData) {
  const { firstName, lastName, age, address, gender, hasChildren } = data;

  // Validate required fields
  const requiredFields = {
    firstName,
    lastName,
    age,
    address,
    gender,
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
          activeStatus: "pending",
          category: category,
          hasChildren: hasChildren ?? false,
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
      .from("member")
      .select("id,firstName")
      .eq("id", applicationId)
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
