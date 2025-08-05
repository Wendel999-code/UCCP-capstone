import { z } from "zod";

export const memberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string().min(1, "Age is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  category: z.string().min(1, "Category is required"),
  address: z.string().min(1, "Address is required"),
  church_id: z.string().min(1, "Church ID is required"),
  circuit: z.string().min(1, "Circuit is required"),
  marital_status: z.string().min(1, "Marital Status is required"),
  baptismDate: z.string().min(1, "Baptism Date is required"),
  officiant: z.string().min(1, "Officiant is required"),
  member_email: z
    .string()
    .min(1, "Member email is required")
    .email("Invalid email address"),
});

export const ApplySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  date_of_birth: z.string().min(1),
  age: z.string().min(1),
  address: z.string().min(1),
  gender: z.enum(["Male", "Female"]),
  member_email: z.string().email(),
  church_id: z.string().min(1),
  marital_status: z.string().min(1),
});
