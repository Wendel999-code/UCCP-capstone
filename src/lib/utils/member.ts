const churches = [
  { name: "palanit", abbr: "PLN" },
  { name: "san Juan", abbr: "SJ" },
  { name: "salvacion", abbr: "SLV" },
  { name: "alegria", abbr: "ALG" },
  { name: "san Isidro", abbr: "SI" },
  { name: "victoria", abbr: "VIC" },
  { name: "allen", abbr: "ALN" },
  { name: "lipata", abbr: "LPT" },
  { name: "cabacungan", abbr: "CBC" },
];

export function generateMemberID(brgy: string): string {
  const matched = churches.find(
    (c) => c.name.toLowerCase() === brgy.toLowerCase()
  );

  if (!matched) {
    throw new Error(`Unrecognized barangay name: "${brgy}"`);
  }

  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `${matched.abbr}-${randomSuffix}`;
}

// Extract first name from email for greeting
export const getFirstName = (email: string) => {
  return (
    email.split("@")[0].split(".")[0].charAt(0).toUpperCase() +
    email.split("@")[0].split(".")[0].slice(1)
  );
};

// Get first letter of email for avatar placeholder
export const getInitial = (email: string) => {
  return email.charAt(0).toUpperCase();
};
