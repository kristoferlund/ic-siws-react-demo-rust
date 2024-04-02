import Button from "../ui/Button";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { useWallet } from "@solana/wallet-adapter-react";

export default function LoginButton() {
  const { connected } = useWallet();
  const { login, isLoggingIn, isPreparingLogin } = useSiwsIdentity();

  const text = () => {
    if (isLoggingIn) {
      return "Signing in";
    }
    if (isPreparingLogin) {
      return "Preparing";
    }
    return "Sign in";
  };

  const icon = isLoggingIn || isPreparingLogin ? faCircleNotch : undefined;

  const disabled = isLoggingIn || !connected || isPreparingLogin;

  return (
    <Button
      className="w-44"
      disabled={disabled}
      icon={icon}
      onClick={() => {
        login();
      }}
      spin
    >
      {text()}
    </Button>
  );
}
