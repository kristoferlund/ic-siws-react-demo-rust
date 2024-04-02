import { useSiwsIdentity } from "ic-use-siws-identity";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";

export function SolanaDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { identityAddress } = useSiwsIdentity();
  const { disconnect } = useWallet();

  return (
    <Dialog className="max-w-md" isOpen={isOpen} setIsOpen={setIsOpen}>
      <img alt="Solana" className="inline-block w-8 h-8" src="/solana.svg" />{" "}
      <HeadlessDialog.Title className="flex justify-between">
        Solana Address
      </HeadlessDialog.Title>
      <div className="px-4 py-2 text-xs rounded-lg text-zinc-400 bg-zinc-900/50">
        <code className="md:whitespace-nowrap">
          {identityAddress && identityAddress.toBase58()}
        </code>
      </div>
      <div className="flex justify-center w-full gap-5">
        <Button onClick={() => setIsOpen(false)} variant="outline">
          Close
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            disconnect();
          }}
        >
          Disconnect
        </Button>
      </div>
    </Dialog>
  );
}
