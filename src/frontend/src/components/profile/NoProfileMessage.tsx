import { useEffect, useState } from "react";

import AddressPill from "../SolanaPill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrincipalPill from "../PrincipalPill";
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
import { useActor } from "../../ic/Actors";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { useWallet } from "@solana/wallet-adapter-react";

export function NoProfileMessage() {
  const { actor } = useActor();
  const { publicKey } = useWallet();
  const { identity } = useSiwsIdentity();

  // Local state
  const [hasProfile, setHasProfile] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!actor) return;
      const response = await actor.get_my_profile();
      if (response && "Ok" in response) {
        if (response.Ok.name === "No Name") {
          setHasProfile(false);
        }
      } else {
        setHasProfile(false);
      }
      setLoading(false);
    })();
  }, [actor]);

  if (loading || hasProfile) return null;

  return (
    <div className="w-full max-w-2xl border-emerald-700/50 border-[1px] bg-emerald-900/50 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
      <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
        <div className="text-2xl font-bold">Welcome!</div>
        <div className="text-lg leading-loose text-center">
          You are logged in and have established a one to one link between your
          Solana address and your Internet Computer identity.
        </div>
        <div>
          <AddressPill
            className="inline-block bg-emerald-800"
            publicKey={publicKey?.toBase58()}
          />
          <FontAwesomeIcon
            className="w-5 h-5 mx-3 text-emerald-500"
            icon={faLeftRight}
          />
          <PrincipalPill
            className="inline-block bg-emerald-800 "
            principal={identity?.getPrincipal().toString()}
          />
        </div>
        <div className="text-lg">Now, save your user profile!</div>
      </div>
    </div>
  );
}
