export const SLIPPAGE = 0.005;

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
    "0x5a1536b770cb70823c6d6f2e0941acb9672787b404cee5c41e6dc6d4eed19207",
  VAULT_ADMIN_CAP:
    "0x08cddebcda64c4f42360b52b8b15ceb8e6b5b19ffa9e717cb58fe4ae7ebe7784",
  THIRD_PARTY_CAP:
    "0xdb276610325ea8666d52545719ef146f12d22899ccde92d4567c49645e928c3f",
  SAVING_VAULT_STRATEGY_CAP:
    "0x399dce526f3431e15b14f24f0fca4a09825cf2f867a120ce1237898e48ac8bb3",
};

export const DUMMY_ADDRESS =
  "0x0c434f35a9b9a569e4f6476b6d1dafcc767de25f3d143e864e8ce319df85d052";

const SAVING_VAULT_PACKAGE_ID =
  "0x1d3f453d102d5580b23c53256f7bc408854555c400d9df7a2874025914c7a587";

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
    "0xcc93039d86ebb5fdf6818267a569c6b155c5bd64333949b91e4c796cc90018bb::ola_st_sbuck::OLA_ST_SBUCK",
  SUI: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
  USDC: "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
};
