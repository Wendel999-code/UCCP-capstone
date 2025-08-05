"use server";

import { createSupabaseServiceRole } from "@/lib/utils/serviceRole";
import { createSupabaseServer } from "../server";
import { LoginSchema } from "../validation/auth";
import { SuperAdmin } from "./dal";

export async function LoginV2(email: string, password: string) {
  const parseResult = LoginSchema.safeParse({ email, password });

  if (!parseResult.success) {
    const message = parseResult.error.errors
      .map((err) => err.message)
      .join(", ");
    return { success: false, message };
  }

  const supabase = await createSupabaseServer();

  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData?.user) {
      console.error("Supabase login error:", authError?.message);
      return {
        success: false,
        message: authError?.message || "Login failed",
      };
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("User")
      .select("role, isBlock")
      .eq("id", authData.user.id)
      .single();

    //TODO implement block in useUser session kay naka login ka bago ka i block cuz it will affect only after logout

    if (existingUser?.isBlock) {
      return {
        success: false,
        message: "Your account has been blocked. Please contact support.",
      };
    }

    if (fetchError && fetchError.code === "PGRST116") {
      const { error: insertError } = await supabase
        .from("User")
        .insert({ email, role: "member" });

      if (insertError) {
        console.error("Insert error:", insertError.message);
        return { success: false, message: insertError.message };
      }

      return {
        success: true,
        message: "Login successfully!",
        role: "member",
      };
    }

    if (fetchError) {
      console.error("Fetch error:", fetchError.message);
      return { success: false, message: fetchError.message };
    }

    return {
      success: true,
      message: "Login successfully",
      role: existingUser?.role,
    };
  } catch (error) {
    console.error("Unexpected error during login:", error);
    return {
      success: false,
      message: "Unexpected error during login. Please try again.",
    };
  }
}

export const fetchCurrentUserV2 = async () => {
  try {
    const supabase = await createSupabaseServer();

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return null;
    }

    const { data: user, error: roleError } = await supabase
      .from("User")
      .select("id, role, email")
      .eq("id", authUser.id)
      .maybeSingle();

    if (roleError) throw new Error(roleError.message);

    //TODO PWEDE KA MAG LOGIN BISAN DIRI MEMBER
    // const { data: member, error: memberError } = await supabase
    //   .from("member")
    //   .select("id, firstName, lastName, Church:church_id(brgy)")
    //   .eq("id", user.id)
    //   .maybeSingle();

    // if (memberError) throw new Error(memberError.message);

    return user;
  } catch (error) {
    console.log("Failed to fetch current user.", error);
    return null;
  }
};

export async function LogoutV2() {
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase Logout error:", error.message);
      return { success: false, message: error.message };
    }
    return {
      success: true,
      message: "Logout successfully",
    };
  } catch (error) {
    console.error("Unexpected error in Logout:", error);
    return { success: false, message: "Unexpected error in Logout" };
  }
}

export async function SignUpV2(email: string, password: string) {
  const parseResult = LoginSchema.safeParse({ email, password });

  if (!parseResult.success) {
    const message = parseResult.error.errors
      .map((err) => err.message)
      .join(", ");
    return { success: false, message };
  }

  try {
    const supabase = await createSupabaseServer();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase signup error:", error.message);
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: "Account created. Please  log in.",
    };
  } catch (error) {
    console.error("Unexpected error in signup:", error);
    return { success: false, message: "Unexpected error in signup" };
  }
}

export async function ResetPassword(email: string) {
  const supabase = await createSupabaseServer();
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error("Supabase reset password error:", error.message);
      return { success: false, message: error.message };
    }
    return {
      success: true,
      message: "Password reset email sent! Please check your inbox.",
    };
  } catch (error) {
    console.log("error in reset password", error);
    return { success: false, message: "Failed to reset password" };
  }
}

export async function UpdatePassword(password: string) {
  const supabase = await createSupabaseServer();
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.error("Supabase update password error:", error.message);
      return { success: false, message: error.message };
    }
    return {
      success: true,
      message: "Password updated successfully!",
    };
  } catch (error) {
    console.log("error in update password", error);
    return { success: false, message: "Failed to update password" };
  }
}

export async function UserAccounts(page: number, pageSize: number) {
  const supabase = await createSupabaseServer();

  const admin = await SuperAdmin();

  if (admin?.role !== "super_admin") {
    return { success: false, message: "Unauthorized access", user: [] };
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  try {
    const {
      data: user,
      error,
      count,
    } = await supabase
      .from("User")
      .select("id,role,email,isBlock", { count: "exact" })
      .neq("role", "super_admin")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: "User accounts fetched successfully",
      user,
      count,
    };
  } catch (error) {
    console.log("error in fetching user account", error);
    return {
      success: false,
      message: "Failed to fetch user account",
      user: [],
    };
  }
}

export async function DeleteUser(userId: string) {
  const supabase = createSupabaseServiceRole();

  if (!userId) return { success: false, message: "User Id is required" };

  try {
    const admin = await SuperAdmin();

    if (admin?.role !== "super_admin") {
      return { success: false, message: "Unauthorized access" };
    }

    const [authRes, tableRes] = await Promise.all([
      supabase.auth.admin.deleteUser(userId),
      supabase.from("User").delete().eq("id", userId),
    ]);

    if (authRes.error) throw new Error(authRes.error.message);
    if (tableRes.error) throw new Error(tableRes.error.message);

    return {
      success: true,
      message: "User account deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleting user account", error);
    return { success: false, message: "Error in deleting user account" };
  }
}

export async function ToggleBlock(userId: string, isBlock: boolean) {
  if (!userId) {
    return { success: false, message: "User ID is required." };
  }

  const supabase = createSupabaseServiceRole();

  try {
    const admin = await SuperAdmin();

    if (admin?.role !== "super_admin") {
      return { success: false, message: "Unauthorized access." };
    }

    const { error: updateError } = await supabase
      .from("User")
      .update({ isBlock })
      .eq("id", userId);

    if (updateError) {
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    // TODO SIGNOUT USER UPON BLOCKING kay pwede pag block mo naka login pa siya
    if (isBlock) {
      await supabase.auth.admin.signOut(userId).catch(() => {});
    }

    return {
      success: true,
      message: `User successfully ${isBlock ? "blocked" : "unblocked"}.`,
    };
  } catch (error) {
    console.error("Error toggling block state:", error);
    return {
      success: false,
      message: "An error occurred while toggling block state.",
    };
  }
}
