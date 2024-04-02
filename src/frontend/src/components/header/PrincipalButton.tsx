import Button from "../ui/Button";
import PrincipalDialog from "./PrincipalDialog";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenPrincipal } from "../../ic/utils/shortenPrincipal";

export default function PrincipalButton() {
  const { identity } = useSiwsIdentity();
  const { publicKey } = useWallet();

  const [isOpen, setIsOpen] = useState(false);

  if (!identity || !publicKey) return null;

  return (
    <>
      <Button
        className="whitespace-nowrap"
        onClick={() => setIsOpen(true)}
        variant="dark"
      >
        <img
          alt="Internet Computer"
          className="inline-block w-4 h-4 mr-1 "
          src="/ic.svg"
        />
        {shortenPrincipal(identity.getPrincipal().toString())}
      </Button>
      <PrincipalDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
