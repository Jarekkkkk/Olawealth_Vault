import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  coinFromBalance,
  coinIntoBalance,
  COINS_TYPE_LIST,
  getInputCoins,
} from "bucket-protocol-sdk";
import { COIN_TYPES } from "lib/const";
import {
  st_buck_saving_vault_deposit,
  st_buck_saving_vault_withdraw,
} from "operation";

export async function stBuckSavingVaultDeposit(
  suiClient: SuiClient,
  senderAddress: string,
  // 9 decimals
  buckAmount: number,
): Promise<Transaction> {
  const tx = new Transaction();

  const [buckCoin] = await getInputCoins(
    tx as any,
    suiClient as any,
    senderAddress,
    COINS_TYPE_LIST.BUCK,
    buckAmount,
  );
  const buckBalance = coinIntoBalance(
    tx as any,
    COINS_TYPE_LIST.BUCK,
    buckCoin,
  );

  const [STBUCKBlance] = st_buck_saving_vault_deposit(tx, buckBalance as any);

  const STBUCKCoin = coinFromBalance(
    tx as any,
    COIN_TYPES.OLA_ST_SBUCK,
    STBUCKBlance as any,
  );

  tx.transferObjects([STBUCKCoin as any], senderAddress);
  return tx;
}

export async function stBuckSavingVaultWithdraw(
  suiClient: SuiClient,
  senderAddress: string,
  sbuckAmount: number,
): Promise<Transaction> {
  const tx = new Transaction();

  const [stsBUCKCOin] = await getInputCoins(
    tx as any,
    suiClient as any,
    senderAddress,
    COIN_TYPES.OLA_ST_SBUCK,
    sbuckAmount,
  );

  const stsbuckBalance = coinIntoBalance(
    tx as any,
    COIN_TYPES.OLA_ST_SBUCK,
    stsBUCKCOin,
  );

  const [buckBalance] = st_buck_saving_vault_withdraw(
    tx,
    stsbuckBalance as any,
  );

  const res = (await suiClient.devInspectTransactionBlock({
    sender: senderAddress,
    transactionBlock: tx,
  })) as any;

  if (!res?.balanceChanges) throw new Error("Tx fail");

  // const coinInAmount = res.balanceChanges.find(
  //   (bal: any) =>
  //     bal.coinType ==
  //       "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK" &&
  //     bal.owner.AddressOwner == senderAddress,
  // );

  console.log("dev+res", res);
  const buckCoin = coinFromBalance(
    tx as any,
    COINS_TYPE_LIST.BUCK,
    buckBalance as any,
  );
  tx.transferObjects([buckCoin as any], senderAddress);

  return tx;
}
