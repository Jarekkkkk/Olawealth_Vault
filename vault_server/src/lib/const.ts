export const SLIPPAGE = 0.005;

export const SHARED_OBJECTS = {
  ST_SBUCK_SAVING_VAULT: {
    objectId: "",
    initialSharedVersion: 0,
    mutable: true,
  },
  SBUCK_SAVING_VAULT_STRATEGY: {
    objectId: "",
    initialSharedVersion: 0,
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
  CLOCK: {
    objectId: "0x6",
    initialSharedVersion: 1,
    mutable: false,
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
    "0xa6f908d178d44d037e31e05f9fea6d3f941bd36eeade3e49ea65dfca12414fb2",
  SAVING_VAULT_STRATEGY_CAP:
    "0xb006b238634aaf3f1edaf25bd20b336552941be61771bdfb2ce13f311ec25d53",
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
  // SAVING_VAULT_STRATEGY
  UNDERLYING_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::underlying_profits`,
  SKIM_BASE_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::skim_base_profits_v1`,
  TAKE_PROFITS_FOR_SELLING: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::take_profits_for_selling`,
  DEPOSIT_SOLD_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::deposit_sold_profits`,
  REBALANCE: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::rebalance_v1`,
  ST_SBUCK_VAULT_DEPOSIT: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::deposit`,
  ST_SBUCK_SAVING_VAULT_WITHDRAW: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::withdraw_v1`,

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
  USDC: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
};

// export const STRATER_CONFIG = {
//   // ST_SBUCK
//   ST_SBUCK_COIN_TYPE:
//     "0xd01d27939064d79e4ae1179cd11cfeeff23943f32b1a842ea1a1e15a0045d77d::st_sbuck::ST_SBUCK",
//   ST_SBUCK_DECIMALS: 9,
//   objects: {
//     ST_SBUCK_SAVING_VAULT: {
//       objectId:
//         "0xe83e455a9e99884c086c8c79c13367e7a865de1f953e75bcf3e529cdf03c6224",
//       initialSharedVersion: 261896418,
//       mutable: true,
//     },
//     SBUCK_SAVING_VAULT_STRATEGY: {
//       objectId:
//         "0x55bb4f6737d9a299cae4da7687dcf0ab4f56494dfe6ec1189a388b6018d0c2a8",
//       initialSharedVersion: 261896419,
//       mutable: true,
//     },
//     SBUCK_FLASK: {
//       objectId:
//         "0xc6ecc9731e15d182bc0a46ebe1754a779a4bfb165c201102ad51a36838a1a7b8",
//       initialSharedVersion: 90706194,
//       mutable: true,
//     },
//     SBUCK_FOUNTAIN: {
//       objectId:
//         "0xbdf91f558c2b61662e5839db600198eda66d502e4c10c4fc5c683f9caca13359",
//       initialSharedVersion: 87170268,
//       mutable: true,
//     },
//   },
//   targets: {
//     stBUCKSavingVaultDeposit:
//       "0x75fe358d87679b30befc498a8dae1d28ca9eed159ab6f2129a654a8255e5610e::sbuck_saving_vault::deposit",
//     buckstSBUCKVaultWithdraw:
//       "0x2a721777dc1fcf7cda19492ad7c2272ee284214652bde3e9740e2f49c3bff457::vault::withdraw",
//     buckstSBUCKVaultRedeemWithdrawTicket:
//       "0x2a721777dc1fcf7cda19492ad7c2272ee284214652bde3e9740e2f49c3bff457::vault::redeem_withdraw_ticket",
//     stBUCKSavingStrategyWithdrawV1:
//       "0x75fe358d87679b30befc498a8dae1d28ca9eed159ab6f2129a654a8255e5610e::sbuck_saving_vault::withdraw_v1",
//   },
// };
