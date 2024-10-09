import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  COINS_TYPE_LIST,
  coinFromBalance,
  coinIntoBalance,
  getInputCoins,
} from "bucket-protocol-sdk";
import {
  aftermathSwapByInput,
  bucketPSMSwapForBuck,
  cetusSwapBuckToUsdc,
  st_buck_saving_vault_deposit,
  st_buck_saving_vault_withdraw,
} from "./operation";
import { OLA_ST_SBUCK_TYPE } from "@/constants/config";
import { bcs } from "@mysten/bcs";
import { CoinBCS } from "./bcs";
import { flowXSwapByInput } from "./router";

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
  const [buckBalance] = bucketPSMSwapForBuck(
    tx,
    COINS_TYPE_LIST.USDC,
    usdcBalance,
  );

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

  const res = await suiClient.devInspectTransactionBlock({
    sender: senderAddress,
    transactionBlock: tx,
  });

  // retrieve the expected amount
  let coinInAmount = 0;
  const returnValues = res.results?.[6].returnValues;
  if (!returnValues || returnValues?.[0][0][0] === 0) {
    coinInAmount = 0;
  } else {
    const valueType = returnValues[0][1];
    const valueData = returnValues[0][0];
    const coin = CoinBCS.parse(Uint8Array.from(valueData as Iterable<number>));

    coinInAmount = Number(coin.value);
  }
  if (coinInAmount == 0) throw new Error("Tx fail");

  // FlowX
  let usdcCoin = await flowXSwapByInput(tx, suiClient, {
    coinInType: COINS_TYPE_LIST.BUCK,
    coinOutType: COINS_TYPE_LIST.USDC,
    amountIn: BigInt(coinInAmount),
    coinIn: buckCoin as any,
  });

  console.log("transactions", tx.blockData.transactions);
  tx.transferObjects([usdcCoin], senderAddress);

  return tx;
}
