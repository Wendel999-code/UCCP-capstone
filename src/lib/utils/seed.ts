import { addMemberAction } from "../supabase/actions/member";

export const seed60Members = async () => {
  const churchId = "081490ea-79e1-4483-812a-51b8c4713169";

  const categories = ["CYF", "CHILDREN"];
  const genders = ["Male", "Female"];
  const maritalStatuses = ["Single", "Married"];
  const circuits = ["North", "South", "Metro", "East", "West"];
  const officiants = ["Rev. Paul", "Pastor Anna", "Elder Cruz"];

  for (let i = 1; i <= 60; i++) {
    const formData = new FormData();
    const gender = genders[i % 2];
    const category = categories[i % categories.length];
    const marital = maritalStatuses[i % maritalStatuses.length];
    const circuit = circuits[i % circuits.length];
    const officiant = officiants[i % officiants.length];

    const age = 18 + (i % 40);
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - age);

    formData.set("firstName", `TestFirst${i}`);
    formData.set("lastName", `TestLast${i}`);
    formData.set("age", age.toString());
    formData.set("date_of_birth", dob.toISOString().split("T")[0]);
    formData.set("gender", gender);
    formData.set("category", category);
    formData.set("address", `Address Block ${i}`);
    formData.set("church_id", churchId);
    formData.set("circuit", circuit);
    formData.set("baptismDate", "2010-01-01");
    formData.set("officiant", officiant);
    formData.set("marital_status", marital);
    formData.set("member_email", `testmember${i}@example.com`);

    const result = await addMemberAction(null, formData);

    if (result?.success) {
      console.log(`✅ Inserted member ${i}`);
    } else {
      console.error(`❌ Failed to insert member ${i}`, result?.errors);
    }
  }
};