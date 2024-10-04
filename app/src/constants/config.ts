export const OLA_ST_SBUCK_TYPE =
  "0xcc93039d86ebb5fdf6818267a569c6b155c5bd64333949b91e4c796cc90018bb::ola_st_sbuck::OLA_ST_SBUCK";
export const SHARED_OBJECTS = {
  ST_SBUCK_SAVING_VAULT: {
    objectId:
      "0xb3238f6dfc2f59351d466e885f7ec5e0c09219caa44cc3815504e23e5a24d480",
    initialSharedVersion: 343316057,
    mutable: true,
  },
  SBUCK_SAVING_VAULT_STRATEGY: {
    objectId:
      "0x3688b783bdd0f04e16e48c48cf9fc4ea537d33f0892b4ee295d174fbc255362c",
    initialSharedVersion: 343316058,
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
  "0x1d3f453d102d5580b23c53256f7bc408854555c400d9df7a2874025914c7a587";

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
