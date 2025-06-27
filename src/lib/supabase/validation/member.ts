import { z } from "zod";

export const memberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.coerce.number().min(0, "Age is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  category: z.string().min(1, "Category is required"),
  address: z.string().min(1, "Address is required"),
  church_id: z.string().min(1, "Church ID is required"),
    circuit: z.string().min(1, "Circuit is required"),

  baptismDate: z.string().min(1, "Baptism Date is required"),
  officiant: z.string().min(1, "Officiant is required"),
});
