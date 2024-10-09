import { Ed25519Keypair, Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { fromHEX } from "@mysten/sui/utils";
import * as dotenv from "dotenv";
import { createPrivateKey } from "crypto";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { CronJob } from "cron";
import { Server } from "./src/server";
import { logger } from "./src/logger";

dotenv.config();

const secret = process.env.ADMIN_PRIVATE_KEY!;
const { secretKey } = decodeSuiPrivateKey(secret);
const keypair = Ed25519Keypair.fromSecretKey(secretKey);
const vaultServer = new Server(keypair);

(async () => {
  try {
    await vaultServer.swap();
    // 1. create new vault
    // await vaultServer.new_vault();
    // 2. create new strategy
    // await vaultserver.new_strategy();
    // 3. join strategy to vault
    // await vaultServer.join_vault();
    // 4. cron job: rebalance
    // await vaultServer.rebalance();
    // admin functions
    // await vaultServer.set_performance_fee();
    // await vaultServer.set_withdraw_fee();
    // await vaultServer.withdraw_performance_fee();
    // await vaultServer.withdraw_performance_fee();
  } catch (error) {
    console.log("error", error);
  }
})();

// const job = new CronJob("0 0 */1 * * *", async function () {
//   try {
//     await vaultServer.rebalance();
//   } catch (error) {
//     logger.error(error);
//   } finally {
//     logger.info("Finish");
//   }
// });
//
// job.start();
