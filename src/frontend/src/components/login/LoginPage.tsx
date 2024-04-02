import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import SolanaPill from "../SolanaPill";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { useWallet } from "@solana/wallet-adapter-react";

export default function LoginPage(): React.ReactElement {
  const { publicKey, connected } = useWallet();
  const { prepareLogin, isPrepareLoginIdle, prepareLoginError, loginError } =
    useSiwsIdentity();

  /**
   * Preload a Siws message on every address change.
   */
  useEffect(() => {
    if (!isPrepareLoginIdle || !publicKey) return;
    prepareLogin();
  }, [publicKey, prepareLogin, isPrepareLoginIdle]);

  /**
   * Show an error toast if the prepareLogin() call fails.
   */
  useEffect(() => {
    if (prepareLoginError) {
      toast.error(prepareLoginError.message, {
        position: "bottom-right",
      });
    }
  }, [prepareLoginError]);

  /**
   * Show an error toast if the login call fails.
   */
  useEffect(() => {
    if (loginError) {
      toast.error(loginError.message, {
        position: "bottom-right",
      });
    }
  }, [loginError]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-10">
      <div className="flex items-center justify-center gap-5 md:gap-20">
        <img
          alt="Internet Computer"
          className="w-20 h-20 md:w-28 md:h-28"
          src="/ic.svg"
        />
        <img
          alt="React"
          className="w-20 h-20 md:w-28 md:h-28"
          src="/react.svg"
        />
        <img
          alt="Solana"
          className="w-20 h-20 md:w-28 md:h-28"
          src="/solana.svg"
        />
      </div>
      <div className="px-10 text-2xl font-bold text-center md:text-5xl">
        Internet Computer + React + Sign In With Solana
      </div>
      <div className="w-80 md:w-96 border-zinc-700/50 border-[1px] bg-zinc-900 drop-shadow-xl rounded-3xl flex flex-col items-center py-5 mt-8 px-5 mx-10">
        <div className="flex flex-col items-center w-full gap-10 p-8">
          <div className="flex items-center justify-center w-full gap-5">
            <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-zinc-300 text-zinc-800">
              1
            </div>
            <div>
              {publicKey && connected ? (
                <SolanaPill
                  className="justify-center w-44"
                  publicKey={publicKey.toBase58()}
                />
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-full gap-5">
            <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-zinc-300 text-zinc-800">
              2
            </div>
            <div>
              {" "}
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
