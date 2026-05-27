/**
 * Extracts initials from an email (first and last letter before @)
 * Example: "john.doe@example.com" -> "JE"
 */
export const getEmailInitials = (email: string): string => {
  const localPart = email.split("@")[0];
  if (!localPart) return "??";

  const firstChar = localPart[0]?.toUpperCase() || "";
  const lastChar = localPart[localPart.length - 1]?.toUpperCase() || "";

  return `${firstChar}${lastChar}`;
};
