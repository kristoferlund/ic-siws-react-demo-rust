import PrincipalButton from "./PrincipalButton";
import SessionButton from "./SessionButton";
import SolanaButton from "./SolanaButton";

export default function Header() {
  return (
    <div className="flex flex-col justify-between w-full gap-10 p-5 md:flex-row">
      <div className="hidden text-xl font-bold text-center md:block">
        Internet Computer + React + Sign In With Solana
      </div>
      <div className="flex flex-col items-center justify-center gap-5 text-sm md:text-base md:flex-row">
        <PrincipalButton />
        <SolanaButton />
        <SessionButton />
      </div>
      <div className="block text-xl font-bold text-center md:hidden">
        Internet Computer + React + Sign In With Solana
      </div>
    </div>
  );
}
