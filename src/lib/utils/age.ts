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

    return `${months} month${months === 0 ? "" : "s"}`;
  }

  return age;
};
