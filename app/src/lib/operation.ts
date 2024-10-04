import {
  CETUS_CONFIG,
  OLA_ST_SBUCK_TYPE,
  SHARED_OBJECTS,
  TARGETS,
} from "@/constants/config";
import {
  Transaction,
  TransactionArgument,
  TransactionResult,
} from "@mysten/sui/transactions";
import {
  CLOCK_OBJECT,
  COINS_TYPE_LIST,
  PROTOCOL_OBJECT,
} from "bucket-protocol-sdk";

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
    typeArguments: [COINS_TYPE_LIST.BUCK, OLA_ST_SBUCK_TYPE],
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
    typeArguments: [COINS_TYPE_LIST.BUCK, OLA_ST_SBUCK_TYPE],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      withdrawTicket,
    ],
  });

  return buckBalance;
}

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

export function cetusSwapBuckToUsdc(
  tx: Transaction,
  senderAddress: string,
  buckCoin: TransactionArgument,
): TransactionArgument {
  const zeroUsdcCoin = newZeroCoin(tx, COINS_TYPE_LIST.USDC);
  const buckCoinValue = getCoinValue(tx, COINS_TYPE_LIST.BUCK, buckCoin);

  const [buckOutCoin, usdcOutCoin] = tx.moveCall({
    target: CETUS_CONFIG.swapTarget,
    typeArguments: [COINS_TYPE_LIST.BUCK, COINS_TYPE_LIST.USDC],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.sharedObjectRef(CETUS_CONFIG.buckUsdcPoolObj),
      buckCoin,
      zeroUsdcCoin,
      tx.pure.bool(true),
      tx.pure.bool(true),
      buckCoinValue,
      tx.pure.u128("4295048016"),
      tx.pure.bool(false),
      tx.sharedObjectRef(CLOCK_OBJECT),
    ],
  });

  tx.transferObjects([buckOutCoin], senderAddress);
  return usdcOutCoin;
}
