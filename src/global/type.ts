export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  category: string;
  hasChildren: boolean;
  gender: string;
  activeStatus: string;
  church_id: string;
  baptism_status?: "Baptized" | "Not Baptized";

  Church?: {
    brgy: string;
  };
  created_at: string;
}
