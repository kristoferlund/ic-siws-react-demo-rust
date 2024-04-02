
![](media/header.png)

✅ Sign in with Solana to interact with smart contracts (canisters) on the [Internet Computer](https://internetcomputer.org) (IC)!

✅ Establish a one-to-one relationship between an Solana wallet and an IC identity.

✅ Access the IC capabilities from Solana dapp frontends, create cross-chain dapps! Some of the features IC provide are:

- Native integration with BTC and ETH
- Twin tokens (ckBTC, ckETH)
- Fast finality
- Low transaction fees
- HTTPS outcalls
- Store large amounts of data cheaply
- etc

This React demo application and template demonstrates how to login Solana users into an IC canister using the [ic-use-siws-identity](https://github.com/kristoferlund/ic-siws/tree/main/packages/ic-use-siws-identity) hook and [ic-siws-provider](https://github.com/kristoferlund/ic-siws/tree/main/packages/ic_siws_provider) canister.

The goal of the [ic-siws](https://github.com/kristoferlund/ic-siws) project is to enhance the interoperability between Solana and the Internet Computer platform, enabling developers to build applications that leverage the strengths of both platforms.

## 👀 Try the live demo: https://guidq-3qaaa-aaaal-qiteq-cai.icp0.io

## Key features

The demo is buit using [Vite](https://vitejs.dev/) to provide a fast development experience. It also uses:

- TypeScript
- TailwindCSS

## Table of contents

- [App components](#app-components)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [IC SIWS Provider](#ic-siws-provider)
- [How it works](#how-it-works)
- [Run locally](#run-locally)
- [Details](#details)
  - [IC SIWS Provider](#ic-siws-provider-1)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
    - [SiwsIdentityProvider](#siweidentityprovider)
    - [AuthGuard](#authguard)
    - [useSiwsIdentity](#usesiweidentity)
- [Updates](#updates)
- [Contributing](#contributing)
- [License](#license)

## App components

If you are new to IC, please read the [Internet Computer Basics](https://internetcomputer.org/basics) before proceeding.

For a detailed description of the SIWS wallet feature, see the [Phantom SIWS description](https://github.com/phantom/sign-in-with-solana/tree/e4060d2916469116d5080a712feaf81ea1db4f65) and the [SIWE specification, EIP-4361](https://eips.ethereum.org/EIPS/eip-4361).

This app consists of three main components:

### Backend

The backend is a Rust based canister that, for demonstration purposes, implements some basic functionality for managing user profiles.

### Frontend

The frontend is a React application that interacts with the backend canister. To be able to make authenticated calls to the backend canister, the frontend needs to have an identity.

### IC SIWS Provider

The pre-built IC Siws Provider is used to create an identity for the user. It is a a Rust based canister that implements the SIWS login flow. The flow starts with a SIWS message being generated and ends with a Delegate Identity being created for the user. The Delegate Identity gives the user access to the backend canister.

## How it works

This is the high-level flow between the app components when a user logs in:

1. The application requests a SIWS message from the `ic_siws_provider` canister on behalf of the user.
2. The application displays the SIWS message to the user who signs it with their Solana wallet.
3. The application sends the signed SIWS message to the `ic_siws_provider` canister to login the user. The canister verifies the signature and creates an identity for the user.
4. The application retrieves the identity from the `ic_siws_provider` canister.
5. The application can now use the identity to make authenticated calls to the app canister.

![Sign in with Solana - Login flow](/media/flow.png)

## Run locally

```bash
dfx start --clean --background
make deploy-all
```

## Details

### IC SIWS Provider

The `ic_siws_provider` canister is pre-built and added to the project as a dependency in the [dfx.json](/dfx.json) file.

```json
{
  "canisters": {
    "ic_siws_provider": {
      "type": "custom",
      "candid": "https://github.com/kristoferlund/ic-siws/releases/download/v0.0.1/ic_siws_provider.did",
      "wasm": "https://github.com/kristoferlund/ic-siws/releases/download/v0.0.1/ic_siws_provider.wasm.gz"
    },
    ...
  },
  ...
}
```

Its behavior is configured and passed as an argument to the canister `init` function. Below is an example of how to configure the canister using the `dfx` command line tool in the project [Makefile](/Makefile):

```makefile
dfx deploy ic_siws_provider --argument "( \
    record { \
        domain = \"127.0.0.1\"; \
        uri = \"http://127.0.0.1:5173\"; \
        salt = \"salt\"; \
        chain_id = opt \"mainnet\"; \
        scheme = opt \"http\"; \
        statement = opt \"Login to the app\"; \
        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
        session_expires_in = opt 604800000000000; /* 1 week */ \
        targets = opt vec { \
            \"$$(dfx canister id ic_siws_provider)\"; \
            \"$$(dfx canister id backend)\"; \
        }; \
    } \
)"
```

For more information about the configuration options, see the [ic-siws-provider](https://github.com/kristoferlund/ic-siws/tree/main/packages/ic_siws_provider) documentation.

### Backend

The backend is a Rust based canister that, for demonstration purposes, implements some basic functionality for managing user profiles. It is also given an init argument - the `ic_siws_provider` canister id - to be able to verify the identity of the user.

```makefile
dfx deploy backend --argument "$$(dfx canister id ic_siws_provider)"
```

### Frontend

The frontend is a React application that interacts with the backend canister. To be able to make authenticated calls to the backend canister, the frontend needs an identity. The identity is retrieved from the `ic_siws_provider` canister.

The frontend uses two other packages from the `ic-siws` project to simplify logging in users and making authenticated calls to canisters:

- [ic-use-siws-identity](https://github.com/kristoferlund/ic-siws/tree/main/packages/ic-use-siws-identity) - React hook and context provider for easy frontend integration with SIWS enabled Internet Computer canisters.
- [ic-use-actor](https://github.com/kristoferlund/ic-use-actor) - A React context provider for managing Internet Computer (IC) actors with enhanced features like type safety and request/response interceptors.

#### [SiwsIdentityProvider](src/frontend/src/main.tsx)

The application's root component is wrapped with `SiwsIdentityProvider` to provide all child components access to the SIWS identity context.

```jsx
// main.tsx

import { SiwsIdentityProvider } from 'ic-use-siws-identity';
import { _SERVICE } from "../../declarations/ic_siws_provider/ic_siws_provider.did";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    // ...
    <SiwsIdentityProvider<_SERVICE>
      canisterId={canisterId}
      idlFactory={idlFactory}
    >
      // ... app components
    </SiwsIdentityProvider>
    // ...
  </React.StrictMode>,
);
```

#### [AuthGuard](src/frontend/src/AuthGuard.tsx)

An `AuthGuard` component is used to protect routes that require the user to be logged in. It also makes sure to log out the user if they change ethereum wallet etc.

#### [useSiwsIdentity](src/frontend/src/components/login/LoginButton.tsx)

To initiate the login flow, the `login` function is called on the Use the `useSiwsIdentity` hook.

```jsx
// LoginButton.tsx

import { useSiwsIdentity } from "ic-use-siws-identity";

function LoginButton() {
  const { login, clear, identity, ... } = useSiwsIdentity();
  // ...
}
```

## Updates

See the [CHANGELOG](CHANGELOG.md) for details on updates.

## Contributing

Contributions are welcome. Please submit your pull requests or open issues to propose changes or report bugs.

## Author

- [kristofer@fmckl.se](mailto:kristofer@fmckl.se)
- Twitter: [@kristoferlund](https://twitter.com/kristoferlund)
- Discord: kristoferkristofer
- Telegram: [@kristoferkristofer](https://t.me/kristoferkristofer)

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
