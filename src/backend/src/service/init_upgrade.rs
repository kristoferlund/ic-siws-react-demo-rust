use candid::Principal;
use ic_cdk::{init, post_upgrade};

use crate::SIWS_PROVIDER_CANISTER;

/// When initializing the canister, save a reference to the siws provider canister.
#[init]
async fn init(siws_provider_canister: String) {
    save_siws_provider_canister(siws_provider_canister);
}

/// When upgrading the canister, save a reference to the siws provider canister.
#[post_upgrade]
fn upgrade(siws_provider_canister: String) {
    save_siws_provider_canister(siws_provider_canister);
}

fn save_siws_provider_canister(siws_provider_canister: String) {
    SIWS_PROVIDER_CANISTER.with(|canister| {
        *canister.borrow_mut() =
            Some(Principal::from_text(siws_provider_canister).expect("Invalid principal"));
    });
}
