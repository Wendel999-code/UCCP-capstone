export type UserRole = "church_admin" | "member" | "super_admin";

export const roleRedirectMap: Record<UserRole, string> = {
  church_admin: "/admin/dashboard",
  member: "/member/dashboard",
  super_admin: "/superAdmin/dashboard",
};
