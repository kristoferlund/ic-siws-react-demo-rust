import "./index.css";

import {
  canisterId,
  idlFactory,
} from "../../declarations/ic_siws_provider/index";

import Actors from "./ic/Actors.tsx";
import App from "./App.tsx";
import AuthGuard from "./AuthGuard.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { SiwsIdentityProvider } from "ic-use-siws-identity";
import SolanaProviders from "./SolanaProviders.tsx";
import { Toaster } from "react-hot-toast";
import { _SERVICE } from "../../declarations/ic_siws_provider/ic_siws_provider.did";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SolanaProviders>
      <SiwsIdentityProvider<_SERVICE>
        canisterId={canisterId}
        idlFactory={idlFactory}
      >
        <Actors>
          <AuthGuard>
            <App />
          </AuthGuard>
        </Actors>
      </SiwsIdentityProvider>
    </SolanaProviders>
    <Toaster />
  </React.StrictMode>
);
