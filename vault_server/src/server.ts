import { Keypair } from "@mysten/sui/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { getUnderlyingProfits } from "./getter";
import { logger } from "./logger";
import {
  bucketPSMSwapForBuck,
  calcRebalanceAmounts,
  cetusSwapSuiToUsdc,
  checkCoinThreshold,
  coinFromBalance,
  coinIntoBalance,
  depositSoldProfits,
  newZeroBalance,
  rebalance,
  skimBaseProfits,
  takeProfitsForSelling,
} from "./operation";
import { Transaction } from "@mysten/sui/transactions";
import { COIN_TYPES, SLIPPAGE } from "./lib/const";
import { BucketClient } from "bucket-protocol-sdk";
import { stBuckSavingVaultDeposit } from "method";

export class Server {
  private keypair: Keypair;
  private client: SuiClient;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
    this.client = new SuiClient({ url: getFullnodeUrl("mainnet") });
  }

  async rebalance() {
    const tx = new Transaction();

    const underlyingProfits = await getUnderlyingProfits(this.client);

    logger.info({ underlyingProfits: underlyingProfits / 10 ** 9 });

    if (underlyingProfits > 0) {
      // require to swap underlyingProfits for BUCK
      const suiBalance = takeProfitsForSelling(tx);
      const suiCoin = coinFromBalance(tx, COIN_TYPES.SUI, suiBalance);
      const usdcCoin = cetusSwapSuiToUsdc(
        tx,
        this.keypair.toSuiAddress(),
        suiCoin,
      );
      const bucketClient = new BucketClient();
      const suiPrice = (await bucketClient.getPrices()).SUI;
      const minUSDCAmount =
        underlyingProfits * suiPrice * (1 - SLIPPAGE) * 10 ** (6 - 9);

      checkCoinThreshold(
        tx,
        usdcCoin,
        COIN_TYPES.USDC,
        BigInt(Math.floor(minUSDCAmount)),
      );
      const usdcBalance = coinIntoBalance(tx, COIN_TYPES.USDC, usdcCoin);
      const buckBalance = bucketPSMSwapForBuck(
        tx,
        COIN_TYPES.USDC,
        usdcBalance,
      );

      // skim accrued fee revenue
      skimBaseProfits(tx);
      depositSoldProfits(tx, buckBalance);
      const rebalanceAmounts = calcRebalanceAmounts(tx);
      rebalance(tx, rebalanceAmounts);
    } else {
      const zeroBuckBalance = newZeroBalance(tx, COIN_TYPES.BUCK);
      skimBaseProfits(tx);
      depositSoldProfits(tx, zeroBuckBalance);
      const rebalanceAmounts = calcRebalanceAmounts(tx);
      rebalance(tx, rebalanceAmounts);
    }

    //logger.info({ tx: tx.blockData.transactions });
    tx.setSender(this.keypair.toSuiAddress());
    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ status: res.effects.status });

    if (res.effects.status.status === "success") {
      const resp = await this.client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keypair,
      });
      logger.info({ resp });
      logger.info("🚀 successful transaction");
    }
  }

  async depositSTSBUCK() {
    const sender = this.keypair.toSuiAddress();

    const tx = await stBuckSavingVaultDeposit(this.client, sender, 10 ** 9);

    tx.setSender(sender);
    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ status: res.effects.status });
  }
}
