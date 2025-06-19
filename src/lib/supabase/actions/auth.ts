import supabase from "../client";

export async function SignUp(email: string, password: string) {
  if (!email || !password) {
    return { success: false, message: "Fill out the input fields first" };
  }

  try {
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
      message: "Account created. Please log in.",
    };
  } catch (error) {
    console.error("Unexpected error in signup:", error);
    return { success: false, message: "Unexpected error in signup" };
  }
}

export async function Login(email: string, password: string) {
  if (!email || !password) {
    return { success: false, message: "Fill out the input fields first" };
  }

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

export async function Logout() {
  try {
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
