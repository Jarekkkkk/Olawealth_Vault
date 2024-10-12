export type MoveCallTarget = `${string}::${string}::${string}`;

export const OLA_ST_SBUCK_TYPE =
  "0xc49b92938b1a9f190267d8c2afb2b5943a39e709d83e388c2c1f3b4325be2167::ola_st_sbuck::OLA_ST_SBUCK";
export const SHARED_OBJECTS = {
  ST_SBUCK_SAVING_VAULT: {
    objectId:
      "0x2e05a1b0b5fb9ba739c03bec103f14f74fdb58c0648abb131c7955d9b8388c27",
    initialSharedVersion: 385264059,
    mutable: true,
  },
  SBUCK_SAVING_VAULT_STRATEGY: {
    objectId:
      "0xd4bb78f48cef0f19a5b2fc30a3021f0c0a938a45106277cc2104128cc0c93e1b",
    initialSharedVersion: 385264060,
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
  "0x197886b6a23c8a84c208969b500cf87ac3049e2d879188c2fa91d1132cf1cfd1";

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
