import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  COINS_TYPE_LIST,
  coinFromBalance,
  coinIntoBalance,
  getInputCoins,
} from "bucket-protocol-sdk";
import {
  bucketPSMSwapForBuck,
  cetusSwapBuckToUsdc,
  st_buck_saving_vault_deposit,
  st_buck_saving_vault_withdraw,
} from "./operation";
import { OLA_ST_SBUCK_TYPE } from "@/constants/config";

export async function stBuckSavingVaultDeposit(
  suiClient: SuiClient,
  senderAddress: string,
  // 9 decimals
  buckAmount: number,
): Promise<Transaction> {
  const tx = new Transaction();

  const [USDCCoin] = await getInputCoins(
    tx as any,
    suiClient as any,
    senderAddress,
    COINS_TYPE_LIST.USDC,
    buckAmount,
  );
  const usdcBalance = coinIntoBalance(
    tx as any,
    COINS_TYPE_LIST.USDC,
    USDCCoin,
  );
  // PSM
  const [buckBalance] = bucketPSMSwapForBuck(
    tx,
    COINS_TYPE_LIST.USDC,
    usdcBalance,
  );

  // stake BUCK to vault
  const [STBUCKBlance] = st_buck_saving_vault_deposit(tx, buckBalance as any);

  const STBUCKCoin = coinFromBalance(
    tx as any,
    OLA_ST_SBUCK_TYPE,
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
    OLA_ST_SBUCK_TYPE,
    sbuckAmount,
  );

  const stsbuckBalance = coinIntoBalance(
    tx as any,
    OLA_ST_SBUCK_TYPE,
    stsBUCKCOin,
  );

  const [buckBalance] = st_buck_saving_vault_withdraw(
    tx,
    stsbuckBalance as any,
  );
  const buckCoin = coinFromBalance(
    tx as any,
    COINS_TYPE_LIST.BUCK,
    buckBalance as any,
  );

  const usdcCoin = cetusSwapBuckToUsdc(tx, senderAddress, buckCoin);

  tx.transferObjects([usdcCoin], senderAddress);

  return tx;
}
