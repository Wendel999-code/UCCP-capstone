import supabase from "../client";

export const logVisitor = async () => {
  try {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();
    const ip = ipData.ip;

    const { data, error: selectError } = await supabase
      .from("visitors")
      .select("id")
      .eq("ip_address", ip)
      .maybeSingle();

    if (selectError) {
      console.error("Error checking existing IP:", selectError.message);
      return;
    }

    if (!data) {
      const { error: insertError } = await supabase.from("visitors").insert({
        ip_address: ip,
      });

      if (insertError) {
        console.error("Error inserting visitor:", insertError.message);
      }
    } else {
      console.log("Visitor already logged:", ip);
    }
  } catch (error) {
    console.error("Error in logVisitor:", error);
  }
};

export const getVisitorCount = async () => {
  try {
    const { count, error } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching visitor count:", error.message);
      return null;
    }

    return count;
  } catch (error) {
    console.error("Error in getVisitorCount:", error);
    return null;
  }
};
