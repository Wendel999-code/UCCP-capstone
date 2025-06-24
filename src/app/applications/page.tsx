import { GetAllChurches } from "@/lib/supabase/actions/church";
import MembershipForm from "./components/MembershipForm";

const page = async () => {
  const churches = await GetAllChurches();

  return (
    <>
      <MembershipForm churches={churches.data} />
    </>
  );
};

export default page;
