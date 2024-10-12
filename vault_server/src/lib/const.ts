export const SLIPPAGE = 0.005;

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

  // CETUS
  CETUS_GLOBAL_CONFIG: {
    objectId:
      "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f",
    initialSharedVersion: 1574190,
    mutable: false,
  },
  CETUS_USDC_SUI_POOL: {
    objectId:
      "0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630",
    initialSharedVersion: 1580450,
    mutable: true,
  },
};

export const OWNED_OBJECTS = {
  OLA_ST_SBUCK_TREASURY_CAP:
    "0x2c6db08d734f2eb275c92f063c421e0460714cb1a2da6a5854dc98c8e51921ad",
  VAULT_ADMIN_CAP:
    "0x9d8577b44e2daeb41a6dc9db1edd0a07b389150c9cbadffabdfb8344d515511e",
  THIRD_PARTY_CAP:
    "0x153b77b9b61d07598d0502bd364b9c25891ff79fac8925b08c6494a1b3707cf9",
  SAVING_VAULT_STRATEGY_CAP:
    "0x6874dd873965401d3efe5bf035875731e8bdff56621bf0c579ef4568a65a7c66",
};

export const DUMMY_ADDRESS =
  "0x0c434f35a9b9a569e4f6476b6d1dafcc767de25f3d143e864e8ce319df85d052";

const SAVING_VAULT_PACKAGE_ID =
  "0x197886b6a23c8a84c208969b500cf87ac3049e2d879188c2fa91d1132cf1cfd1";

export const TARGETS = {
  // SAVING_VAULT
  NEW_VAULT: `${SAVING_VAULT_PACKAGE_ID}::vault::new`,
  ST_SBUCK_VAULT_WITHDRAW: `${SAVING_VAULT_PACKAGE_ID}::vault::withdraw`,
  ST_SBUCK_VAULT_WITHDRAW_TICKET: `${SAVING_VAULT_PACKAGE_ID}::vault::redeem_withdraw_ticket`,
  CALC_REBALANCE_AMOUNTS: `${SAVING_VAULT_PACKAGE_ID}::vault::calc_rebalance_amounts`,
  ST_SBUCK_VAULT_REDEEM_WITHDRAW_TICKET: `${SAVING_VAULT_PACKAGE_ID}::vault::redeem_withdraw_ticket`,
  SET_PERFROMANCE_FEE_BPS: `${SAVING_VAULT_PACKAGE_ID}::vault::set_performance_fee_bps`,
  SET_WITHDRAW_FEE_BPS: `${SAVING_VAULT_PACKAGE_ID}::vault::set_withdraw_fee_bps`,
  WITHDRAW_PERFORMANCE_FEE: `${SAVING_VAULT_PACKAGE_ID}::vault::withdraw_performance_fee`,
  WITHDRAW_WITHDRAW_FEE: `${SAVING_VAULT_PACKAGE_ID}::vault::withdraw_withdraw_fee`,
  // SAVING_VAULT_STRATEGY
  NEW_STRATEGY: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::new`,
  JOIN_VAULT: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::join_vault`,
  UNDERLYING_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::underlying_profits`,
  SKIM_BASE_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::skim_base_profits`,
  TAKE_PROFITS_FOR_SELLING: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::take_profits_for_selling`,
  DEPOSIT_SOLD_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::deposit_sold_profits`,
  REBALANCE: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::rebalance`,
  ST_SBUCK_VAULT_DEPOSIT: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::deposit`,
  ST_SBUCK_SAVING_VAULT_WITHDRAW: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::withdraw`,

  // CETUS
  CETUS_SWAP:
    "0x8faab90228e4c4df91c41626bbaefa19fc25c514405ac64de54578dec9e6f5ee::router::swap",
  CETUS_CHECK_COIN_THRESHOLD:
    "0x8faab90228e4c4df91c41626bbaefa19fc25c514405ac64de54578dec9e6f5ee::router::check_coin_threshold",
  // BUCKET
  BUCKET_CHARGE_RESERVOIR:
    "0xb71c0893203d0f59622fc3fac849d0833de559d7503af21c5daf880d60d754ed::buck::charge_reservoir",
};

export const COIN_TYPES = {
  BUCK: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
  OLA_ST_SBUCK:
    "0xc49b92938b1a9f190267d8c2afb2b5943a39e709d83e388c2c1f3b4325be2167::ola_st_sbuck::OLA_ST_SBUCK",
  SUI: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
  USDC: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
};
