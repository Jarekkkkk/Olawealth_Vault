import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  coinIntoBalance,
  COINS_TYPE_LIST,
  getInputCoins,
} from "bucket-protocol-sdk";
import { STRATER_CONFIG } from "lib/const";
import {
  coinFromBalance,
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
    tx,
    STRATER_CONFIG.ST_SBUCK_COIN_TYPE,
    STBUCKBlance,
  );

  tx.transferObjects([STBUCKCoin], senderAddress);
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
    STRATER_CONFIG.ST_SBUCK_COIN_TYPE,
    sbuckAmount,
  );

  const stsbuckBalance = coinIntoBalance(
    tx as any,
    STRATER_CONFIG.ST_SBUCK_COIN_TYPE,
    stsBUCKCOin,
  );

  const [buckBalance] = st_buck_saving_vault_withdraw(
    tx,
    stsbuckBalance as any,
  );
  const buckCOin = coinFromBalance(tx, COINS_TYPE_LIST.BUCK, buckBalance);
  tx.transferObjects([buckCOin], senderAddress);

  return tx;
}
