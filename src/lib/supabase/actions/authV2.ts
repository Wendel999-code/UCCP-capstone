"use server";

import { createSupabaseServer } from "../server";
import { LoginSchema } from "../validation/auth";

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
      .select("role")
      .eq("id", authData.user.id)
      .single();

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
        message: "Login successfully",
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

    const { data: roleData, error: roleError } = await supabase
      .from("User")
      .select("id, role")
      .eq("id", authUser.id)
      .single();

    if (roleError) throw new Error(roleError.message);

    return roleData;
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
    const { error } = await supabase.auth.resetPasswordForEmail(email)

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
