import {
  differenceInMonths,
  differenceInYears,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";

export function getAgeAtBaptism(dob: string, baptismDate: string): string {
  const birth = new Date(dob);
  const baptism = new Date(baptismDate);

  if (isNaN(birth.getTime()) || isNaN(baptism.getTime())) return "N/A";
  if (baptism < birth) return "Invalid";

  const months = differenceInMonths(baptism, birth);

  if (months < 12) {
    return `${months} month${months <= 1 ? "" : "s"} old`;
  }

  const years = differenceInYears(baptism, birth);
  return `${years} year${years <= 1 ? "" : "s"} old`;
}

export function FormattedDate(date: string) {
  if (!date) return null;

  const parsedDate = new Date(date);

  let display;

  if (isToday(parsedDate) || isYesterday(parsedDate)) {
    display = formatDistanceToNow(parsedDate, { addSuffix: true });
  } else {
    display = format(parsedDate, "PPpp");
  }

  return display;
}
