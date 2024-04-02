import Pill from "./ui/Pill";
import { shortenAddress } from "../solana/utils/shortenPublicKey";

export default function SolanaPill({
  publicKey,
  className,
}: {
  publicKey?: string;
  className?: string;
}) {
  if (!publicKey) return null;
  return (
    <Pill className={className}>
      <img
        alt="Solana"
        className="inline-block w-3 h-3 ml-2"
        src="/solana-icon.svg"
      />
      {shortenAddress(publicKey)}
    </Pill>
  );
}
