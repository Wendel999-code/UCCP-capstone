export const calculateAge = (dob: string) => {
  if (!dob) return "";
  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age <= 0) {
    let months =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      today.getMonth() -
      birthDate.getMonth();

    if (today.getDate() < birthDate.getDate()) {
      months--;
    }

    months = Math.max(months, 0);

    return `${months} month${months <= 1 ? "" : "s"}`;
  }

  return age;
};

export function parseAgeToYears(age: string | number): number {
  if (typeof age === "number") return age;

  const str = age.trim().toLowerCase();

  if (str.includes("month")) {
    const months = parseFloat(str);
    return months / 12;
  }

  const years = parseFloat(str);
  return isNaN(years) ? 0 : years;
}
