import {
  Transaction,
  TransactionArgument,
  TransactionResult,
} from "@mysten/sui/transactions";
import {
  COIN_TYPES,
  OWNED_OBJECTS,
  SHARED_OBJECTS,
  TARGETS,
} from "./lib/const";
import { bcs } from "@mysten/sui/bcs";
import {
  CLOCK_OBJECT,
  COINS_TYPE_LIST,
  PROTOCOL_ID,
  PROTOCOL_OBJECT,
} from "bucket-protocol-sdk";

export function newZeroBalance(
  tx: Transaction,
  coinType: string,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::balance::zero",
    typeArguments: [coinType],
  });
}
export function newZeroCoin(
  tx: Transaction,
  coinType: string,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::coin::zero",
    typeArguments: [coinType],
  });
}

export function getCoinValue(
  tx: Transaction,
  coinType: string,
  coin: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::coin::value",
    typeArguments: [coinType],
    arguments: [coin],
  });
}

export function new_vault(
  tx: Transaction,
  treasury_cap: string,
): TransactionResult {
  return tx.moveCall({
    target: TARGETS.NEW_VAULT,
    typeArguments: [COIN_TYPES.BUCK, COIN_TYPES.OLA_ST_SBUCK],
    arguments: [tx.object(treasury_cap)],
  });
}

export function new_strategy(
  tx: Transaction,
  vault_cap: string,
): TransactionResult {
  return tx.moveCall({
    target: TARGETS.NEW_STRATEGY,
    arguments: [tx.object(vault_cap)],
  });
}

export function join_vault(
  tx: Transaction,
  vault_cap: string,
  strategy_cap: string,
): TransactionResult {
  return tx.moveCall({
    target: TARGETS.JOIN_VAULT,
    arguments: [
      tx.object(vault_cap),
      tx.object(strategy_cap),
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
    ],
  });
}

export function underlyingProfits(tx: Transaction) {
  tx.moveCall({
    target: TARGETS.UNDERLYING_PROFITS,
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function skimBaseProfits(tx: Transaction) {
  tx.moveCall({
    target: TARGETS.SKIM_BASE_PROFITS,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(PROTOCOL_OBJECT),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FLASK),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function takeProfitsForSelling(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: TARGETS.TAKE_PROFITS_FOR_SELLING,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.pure(bcs.option(bcs.U64).serialize(null)),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function depositSoldProfits(
  tx: Transaction,
  buckBalance: TransactionArgument,
) {
  tx.moveCall({
    target: TARGETS.DEPOSIT_SOLD_PROFITS,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      buckBalance,
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function calcRebalanceAmounts(tx: Transaction): TransactionResult {
  // return 'rebalanceAmounts'
  return tx.moveCall({
    target: TARGETS.CALC_REBALANCE_AMOUNTS,
    typeArguments: [COIN_TYPES.BUCK, COIN_TYPES.OLA_ST_SBUCK],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function rebalance(
  tx: Transaction,
  rebalanceAmounts: TransactionArgument,
): TransactionResult {
  // return 'rebalanceAmounts'
  return tx.moveCall({
    target: TARGETS.REBALANCE,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      rebalanceAmounts,
      tx.sharedObjectRef(PROTOCOL_OBJECT),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FLASK),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function cetusSwapSuiToUsdc(
  tx: Transaction,
  senderAddress: string,
  suiCoin: TransactionArgument,
): TransactionArgument {
  const zeroUsdcCoin = newZeroCoin(tx, COIN_TYPES.USDC);
  const suiCoinValue = getCoinValue(tx, COIN_TYPES.SUI, suiCoin);

  const [usdcOutCoin, suiOutCoin] = tx.moveCall({
    target: TARGETS.CETUS_SWAP,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.SUI],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.CETUS_GLOBAL_CONFIG),
      tx.sharedObjectRef(SHARED_OBJECTS.CETUS_USDC_SUI_POOL),
      zeroUsdcCoin,
      suiCoin,
      tx.pure(bcs.bool().serialize(false)),
      tx.pure(bcs.bool().serialize(true)),
      suiCoinValue,
      tx.pure(bcs.u128().serialize("79226673515401279992447579055")),
      tx.pure(bcs.bool().serialize(false)),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });

  tx.transferObjects([suiOutCoin], senderAddress);
  return usdcOutCoin;
}

export function checkCoinThreshold(
  tx: Transaction,
  coin: TransactionArgument,
  type: string,
  limitAmount: bigint,
) {
  tx.moveCall({
    target: TARGETS.CETUS_CHECK_COIN_THRESHOLD,
    typeArguments: [type],
    arguments: [coin, tx.pure(bcs.u64().serialize(limitAmount))],
  });
}

// @return; buckBalance
export function bucketPSMSwapForBuck(
  tx: Transaction,
  coinType: string,
  balance: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: TARGETS.BUCKET_CHARGE_RESERVOIR,
    typeArguments: [coinType],
    arguments: [tx.sharedObjectRef(PROTOCOL_OBJECT), balance],
  });
}

export function st_buck_saving_vault_deposit(
  tx: Transaction,
  buck_balance: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: TARGETS.ST_SBUCK_VAULT_DEPOSIT,
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      buck_balance,
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });
}

export function st_buck_saving_vault_withdraw(
  tx: Transaction,
  buck_balance: TransactionArgument,
): TransactionResult {
  const withdrawTicket = tx.moveCall({
    target: TARGETS.ST_SBUCK_VAULT_WITHDRAW,
    typeArguments: [COINS_TYPE_LIST.BUCK, COIN_TYPES.OLA_ST_SBUCK],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      buck_balance,
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });

  tx.moveCall({
    target: TARGETS.ST_SBUCK_SAVING_VAULT_WITHDRAW,
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(PROTOCOL_OBJECT),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FLASK),
      withdrawTicket,
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });

  const buckBalance = tx.moveCall({
    target: TARGETS.ST_SBUCK_VAULT_REDEEM_WITHDRAW_TICKET,
    typeArguments: [COINS_TYPE_LIST.BUCK, COIN_TYPES.OLA_ST_SBUCK],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      withdrawTicket,
    ],
  });

  return buckBalance;
}
