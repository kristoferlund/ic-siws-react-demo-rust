import React, { useEffect } from "react";

import LoginPage from "./components/login/LoginPage";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { useWallet } from "@solana/wallet-adapter-react";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { publicKey, connected } = useWallet();

  const { clear, isInitializing, identity, identityAddress } =
    useSiwsIdentity();

  // If the user is not connected, clear the session.
  useEffect(() => {
    if (identity && connected && !publicKey) {
      clear();
    }
  }, [connected, publicKey, clear, identity]);

  // If the user switches to a different address, clear the session.
  useEffect(() => {
    if (identityAddress && publicKey && !identityAddress.equals(publicKey)) {
      clear();
    }
  }, [publicKey, clear, identityAddress]);

  if (isInitializing) {
    return null;
  }

  // If wallet is not connected or there is no identity, show login page.
  if (!isInitializing && (!publicKey || !identity)) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
