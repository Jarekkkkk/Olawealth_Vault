import { Keypair } from "@mysten/sui/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { getUnderlyingProfits } from "./getter";
import { logger } from "./logger";
import {
  bucketPSMSwapForBuck,
  calcRebalanceAmounts,
  cetusSwapSuiToUsdc,
  checkCoinThreshold,
  depositSoldProfits,
  join_vault,
  new_strategy,
  new_vault,
  newZeroBalance,
  rebalance,
  setPerformanceFeeBps,
  setWithdrawFeeBps,
  skimBaseProfits,
  takeProfitsForSelling,
  withdrawPerformanceFee,
  withdrawWithdrawFee,
} from "./operation";
import { Transaction } from "@mysten/sui/transactions";
import { COIN_TYPES, OWNED_OBJECTS, SLIPPAGE } from "./lib/const";
import {
  BucketClient,
  coinFromBalance,
  coinIntoBalance,
} from "bucket-protocol-sdk";
import { stBuckSavingVaultDeposit } from "method";

export class Server {
  private keypair: Keypair;
  private client: SuiClient;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
    this.client = new SuiClient({ url: getFullnodeUrl("mainnet") });
  }

  async new_vault() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    new_vault(tx, OWNED_OBJECTS.OLA_ST_SBUCK_TREASURY_CAP);

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

  async new_strategy() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    new_strategy(tx, OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP);
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

  async join_vault() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    join_vault(
      tx,
      OWNED_OBJECTS.OLA_ST_SBUCK_TREASURY_CAP,
      OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP,
    );

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

  async rebalance() {
    const tx = new Transaction();

    const underlyingProfits = await getUnderlyingProfits(this.client);

    logger.info({ underlyingProfits: underlyingProfits / 10 ** 9 });

    if (underlyingProfits > 0) {
      // require to swap underlyingProfits for BUCK
      const suiBalance = takeProfitsForSelling(tx);
      const suiCoin = coinFromBalance(
        tx as any,
        COIN_TYPES.SUI,
        suiBalance as any,
      );
      const usdcCoin = cetusSwapSuiToUsdc(
        tx,
        this.keypair.toSuiAddress(),
        suiCoin as any,
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
      const usdcBalance = coinIntoBalance(
        tx as any,
        COIN_TYPES.USDC,
        usdcCoin as any,
      );
      const buckBalance = bucketPSMSwapForBuck(
        tx,
        COIN_TYPES.USDC,
        usdcBalance as any,
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

  async set_performance_fee() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    setPerformanceFeeBps(tx, BigInt(1000));

    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ status: res.effects.status });
  }

  async set_withdraw_fee() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    setWithdrawFeeBps(tx, BigInt(3));

    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ status: res.effects.status });
  }

  async withdraw_performance_fee() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    const lpBalance = withdrawPerformanceFee(tx, BigInt(1));
    const lpCoin = coinFromBalance(
      tx as any,
      COIN_TYPES.OLA_ST_SBUCK,
      lpBalance as any,
    );
    tx.transferObjects([lpCoin as any], this.keypair.toSuiAddress());

    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ status: res.effects.status });
  }

  async withdraw_withdraw_fee() {
    const tx = new Transaction();
    tx.setSender(this.keypair.toSuiAddress());

    const buckBalance = withdrawWithdrawFee(tx, BigInt(1));
    const buckCoin = coinFromBalance(
      tx as any,
      COIN_TYPES.BUCK,
      buckBalance as any,
    );
    tx.transferObjects([buckCoin as any], this.keypair.toSuiAddress());

    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ status: res.effects.status });
  }
}
