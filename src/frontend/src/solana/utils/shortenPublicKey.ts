export const shortenAddress = (address?: string): string | undefined => {
  if (!address) return address;
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
};
