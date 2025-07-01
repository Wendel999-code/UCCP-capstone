import { GetAllChurches } from "@/lib/supabase/actions/church";
import Header from "../landing/Header";
import MembershipForm from "./components/MembershipForm";

const page = async () => {
  const churches = await GetAllChurches();

  return (
    <>
      <Header />
      <MembershipForm churches={churches.data} />
    </>
  );
};

export default page;
