import React from "react";
import MembershipForm from "./components/MembershipForm";
import { GetAllChurches } from "@/lib/supabase/actions/church";

const page = async () => {
  const churches = await GetAllChurches();

  return (
    <>
      <MembershipForm churches={churches.data} />
    </>
  );
};

export default page;
