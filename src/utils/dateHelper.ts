export function getAgeAtBaptism(
  birthDateStr: string,
  baptismDateStr: string
): number {
  const birthDate = new Date(birthDateStr);
  const baptismDate = new Date(baptismDateStr);
  let age = baptismDate.getFullYear() - birthDate.getFullYear();
  const m = baptismDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && baptismDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 ? age : 1;
}
