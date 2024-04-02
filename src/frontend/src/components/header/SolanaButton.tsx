import Button from "../ui/Button";
import { SolanaDialog } from "./SolanaDialog";
import { shortenAddress } from "../../solana/utils/shortenPublicKey";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function SolanaButton() {
  const [solanaDialogOpen, setSolanaDialogOpen] = useState(false);
  const { publicKey } = useWallet();

  const handleClick = () => {
    if (publicKey) {
      setSolanaDialogOpen(true);
    }
  };

  return (
    <>
      <Button onClick={handleClick} variant="dark">
        <img
          alt="Solana"
          className="inline-block w-3 h-3 mr-1 "
          src="/solana-icon.svg"
        />
        {shortenAddress(publicKey?.toBase58())}
      </Button>
      <SolanaDialog isOpen={solanaDialogOpen} setIsOpen={setSolanaDialogOpen} />
    </>
  );
}
