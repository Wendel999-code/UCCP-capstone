"use server";

import { createSupabaseServer } from "../server";

export async function PostTestimonialV2(desc: string) {
  if (!desc) {
    return { success: false, message: "Fill out the input fields first" };
  }

  const supabase = await createSupabaseServer();

  try {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return { success: false, message: "Unauthorized" };
    }

    const { error } = await supabase
      .from("testimonial")
      .insert({ description: desc, fullName: data.user?.email });

    if (error) {
      console.log("error in post testimonial", error);
      return { success: false, message: "Failed to post testimonial" };
    }

    return { success: true, message: "Testimonial posted" };
  } catch (error) {
    console.log("error in post testimonial", error);
    return { success: false, message: "Failed to post testimonial" };
  }
}

export type ToggleLikeResult =
  | { success: true; liked_user: string[]; likes_count: number }
  | { success: false; message: string };

export async function ToggleLike(
  testimonialId: string,
  isLiked: boolean
): Promise<ToggleLikeResult> {
  if (!testimonialId || typeof isLiked !== "boolean") {
    return { success: false, message: "Invalid parameters" };
  }

  const supabase = await createSupabaseServer();

  try {
    // Run both in parallel
    const [authRes, rowRes] = await Promise.all([
      supabase.auth.getUser(),
      supabase
        .from("testimonial")
        .select("liked_user")
        .eq("id", testimonialId)
        .single(),
    ]);

    // Handle auth
    if (authRes.error) return { success: false, message: "Auth error" };
    const userId = authRes.data.user?.id;
    if (!userId) return { success: false, message: "Unauthorized" };

    // Handle testimonial fetch
    if (rowRes.error || !rowRes.data) {
      return { success: false, message: "Testimonial not found" };
    }

    const currentLikes: string[] = Array.isArray(rowRes.data.liked_user)
      ? (rowRes.data.liked_user as string[])
      : [];

    // Compute updated likes
    const updatedLikes = isLiked
      ? currentLikes.filter((id) => id !== userId)
      : currentLikes.includes(userId)
        ? currentLikes
        : [...currentLikes, userId];

    // Update & fetch in one call
    const { data: updated, error: updateError } = await supabase
      .from("testimonial")
      .update({ liked_user: updatedLikes })
      .eq("id", testimonialId)
      .select("liked_user")
      .single();

    if (updateError || !updated) {
      return { success: false, message: "Failed to update likes" };
    }

    const safeLikes = Array.isArray(updated.liked_user)
      ? (updated.liked_user as string[])
      : [];

    return {
      success: true,
      liked_user: safeLikes,
      likes_count: safeLikes.length,
    };
  } catch (error) {
    console.error("error in toggle like", error);
    return { success: false, message: "Failed to toggle like" };
  }
}
