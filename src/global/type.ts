export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  date_of_birth: string;
  member_email: string;
  address: string;
  category: string;
  hasChildren?: boolean;
  marital_status?: string;
  gender: string;
  activeStatus: string;
  church_id: string;
  baptism_status?: "Baptized" | "Not Baptized";
  baptism_date?: string;
  officiant?: string;
  Church?: {
    brgy: string;
  };
  created_at: string;
}

export interface Baptismal_Record {
  id: string;
  fullName: string;
  date_of_baptism: string;
  officiant: string;
  member_id: string;
}

export interface GeneratedCertificate {
  baptism_date: string;
  officiant: string;
  firstName: string;
  lastName: string;
  date_of_birth: string;
  circuit: string;
}

export interface CertificateRequest {
  id: string;
  firstName: string;
  lastName: string;
  father_fn: string;
  mother_fn: string;
  email: string;
  member_id: string;
  date_of_birth: string;
  created_at?: string;
  church_id?: string;
  status?: "Pending" | "Declined" | "Completed";
  Church?: {
    brgy?: string;
  };
  Baptismal_Record?: {
    baptism_date?: string;
    officiant?: string;
  };
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

export type churchType = {
  id: string;
  brgy: string;
};

export type MemberResend = {
  firstName: string;
  lastName: string;
  church: string;
  memberID: string;
  member_email?: string;
};

export type ReqCertUpdateType = {
  firstName: string;
  lastName: string;
  email: string;
  brgy: string;
};

export interface CertificateDetails {
  baptism_date: string;
  officiant: string;
  circuit: string;
  firstName: string;
  lastName: string;
  gender: string;
  date_of_birth: string;
  father_fn: string;
  mother_fn: string;
}

export interface GetReqCertificateResponse {
  success: boolean;
  data: CertificateDetails | null;
  error: string | null;
}

export type CountMemPerChurch = {
  church_id: string;
  brgy: string;
  member_count: number;
};

export type Testimonial = {
  id: string;
  fullName?: string;
  description?: string;
};

export type ActivityLogPayload = {
  action: string;
  metadata?: Record<string, any>;
};

export type ActivityLogResult = {
  success: boolean;
  message: string;
};

export type ActivityLog = {
  id: string;
  church_id: string;
  brgy?: string;
  admin_id: string;
  action: string;
  metadata: Record<string, any> | null;
  created_at: string;
};

export type MemberQueryResponse = {
  data: Member[];
  count: number;
};

export type User = {
  id: string;
  role: string;
  email: string;
  isBlock: boolean;
};

export type UserAccounts = {
  user: User[];
  count: number;
};
