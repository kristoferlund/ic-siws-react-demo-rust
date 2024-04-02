export const shortenPrincipal = (principal?: string): string | undefined => {
  if (!principal) return principal;
  return `${principal.substring(0, 4)}...${principal.substring(
    principal.length - 4
  )}`;
};
