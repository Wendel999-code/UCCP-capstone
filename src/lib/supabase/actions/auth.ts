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

    const { data: user, error: userError } = await supabase
      .from("User")
      .insert([
        {
          role: "member",
          email: email,
        },
      ])
      .select();

    if (userError) {
      console.error("Error inserting into User table:", userError.message);
      return { success: false, message: "Error saving user data" };
    }

    return {
      success: true,
      message: "Signup successfully",
      user,
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Login error:", error.message);
      return { success: false, message: error.message };
    }

    const { data: user, error: userError } = await supabase
      .from("User")
      .select("id,role")
      .eq("id", data.user?.id)
      .single();

    if (userError) {
      console.error("error fetching role:", userError.message);
      return { success: false, message: userError.message };
    }

    return {
      success: true,
      message: "Login successfully",
      role: user.role,
    };
  } catch (error) {
    console.error("Unexpected error in Login:", error);
    return { success: false, message: "Unexpected error in Login" };
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
