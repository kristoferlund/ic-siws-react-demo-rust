import { shortenPrincipal } from "../ic/utils/shortenPrincipal";
import Pill from "./ui/Pill";

type PrincipalPillProps = {
  principal?: string;
  className?: string;
};

export default function PrincipalPill({
  principal,
  className,
}: PrincipalPillProps) {
  return (
    <Pill className={className}>
      <img alt="ic" className="w-4 h-4" src="/ic.svg" />
      {shortenPrincipal(principal)}
    </Pill>
  );
}
