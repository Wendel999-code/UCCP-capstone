import { z } from "zod";

export const certificateRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("A valid email is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  church_id: z.string().min(1, "Church ID is required"),
  member_id: z.string().min(1, "Member ID is required"),
  father_fn: z.string().min(1, "Father's full name is required"),
  mother_fn: z.string().min(1, "Mother's full name is required"),
});
