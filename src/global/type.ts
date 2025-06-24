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

export interface CertificateRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  date_of_birth: string;
  circuit: string;
  status: "Pending" | "Declined" | "Completed";
}


export type ChurchAdmin = {
  role: string;
  church_id: string;
  Church: {
    brgy: string;
  };
};


export type ApproveMemberInput = {
  memberID: string;
  acceptanceDate: string;
  officiant: string;
};