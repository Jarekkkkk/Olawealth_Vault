export type MoveCallTarget = `${string}::${string}::${string}`;

export const OLA_ST_SBUCK_TYPE =
  "0x61c2af08ff06cc8be36a4f7eb0d47a5da40fabd2875d6175aabe364394ce36b2::ola_st_sbuck::OLA_ST_SBUCK";
export const SHARED_OBJECTS = {
  ST_SBUCK_SAVING_VAULT: {
    objectId:
      "0xa335335bb6431c45910dbe5e4e2a80f2eafd21ab8e223dc62d226bbb9746d269",
    initialSharedVersion: 357683086,
    mutable: true,
  },
  SBUCK_SAVING_VAULT_STRATEGY: {
    objectId:
      "0x4ea8636c2ce349bec8e84ebb943bd78d4f5dbea65c32f5f03c134d532a1afed9",
    initialSharedVersion: 357683087,
    mutable: true,
  },
  // BUCKET
  SBUCK_FLASK: {
    objectId:
      "0xc6ecc9731e15d182bc0a46ebe1754a779a4bfb165c201102ad51a36838a1a7b8",
    initialSharedVersion: 90706194,
    mutable: true,
  },
  SBUCK_FOUNTAIN: {
    objectId:
      "0xbdf91f558c2b61662e5839db600198eda66d502e4c10c4fc5c683f9caca13359",
    initialSharedVersion: 87170268,
    mutable: true,
  },
};
const SAVING_VAULT_PACKAGE_ID =
  "0xabae3cfeed5e54d6ae3ecd4209d3582833e4153fba658d8c8e0d8a1aba79dcfa";

export const TARGETS = {
  // SAVING_VAULT
  ST_SBUCK_VAULT_WITHDRAW: `${SAVING_VAULT_PACKAGE_ID}::vault::withdraw`,
  ST_SBUCK_VAULT_WITHDRAW_TICKET: `${SAVING_VAULT_PACKAGE_ID}::vault::redeem_withdraw_ticket`,
  ST_SBUCK_VAULT_REDEEM_WITHDRAW_TICKET: `${SAVING_VAULT_PACKAGE_ID}::vault::redeem_withdraw_ticket`,
  // SAVING_VAULT_STRATEGY
  ST_SBUCK_VAULT_DEPOSIT: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::deposit`,
  ST_SBUCK_SAVING_VAULT_WITHDRAW: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::withdraw`,
  // Bucket
  BUCKET_CHARGE_RESERVOIR:
    "0xb71c0893203d0f59622fc3fac849d0833de559d7503af21c5daf880d60d754ed::buck::charge_reservoir",
};

export const CETUS_CONFIG = {
  //targets
  swapTarget:
    "0x6f5e582ede61fe5395b50c4a449ec11479a54d7ff8e0158247adfda60d98970b::router::swap" as MoveCallTarget,
  globalConfigObj: {
    objectId:
      "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f",
    initialSharedVersion: 1574190,
    mutable: false,
  },
  buckUsdcPoolObj: {
    objectId:
      "0x6ecf6d01120f5f055f9a605b56fd661412a81ec7c8b035255e333c664a0c12e7",
    initialSharedVersion: 11391673,
    mutable: true,
  },
};
