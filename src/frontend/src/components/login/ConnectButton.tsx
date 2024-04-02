import Button from "../ui/Button";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function ConnectButton() {
  const { setVisible } = useWalletModal();
  const { connecting } = useWallet();

  const handleClick = () => {
    if (connecting) return;
    setVisible(true);
  };

  const buttonIcon = connecting ? faCircleNotch : undefined;

  const buttonText = connecting ? "Connecting" : "Connect wallet";

  return (
    <>
      <Button
        className="w-44"
        disabled={connecting}
        icon={buttonIcon}
        onClick={handleClick}
        spin={connecting}
      >
        {!connecting && (
          <img
            alt="Solana"
            className="inline-block w-3 h-3"
            src="/solana-icon.svg"
          />
        )}
        {buttonText}
      </Button>
    </>
  );
}
