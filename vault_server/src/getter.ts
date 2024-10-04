import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { DUMMY_ADDRESS } from "./lib/const";
import { underlyingProfits } from "./operation";
import { bcs } from "@mysten/sui/bcs";
import { logger } from "./logger";

export async function getUnderlyingProfits(
  suiClient: SuiClient,
): Promise<number> {
  let tx = new Transaction();
  underlyingProfits(tx);

  let res = await suiClient.devInspectTransactionBlock({
    sender: DUMMY_ADDRESS,
    transactionBlock: tx,
  });
  const returnValues = res?.results?.[0]?.returnValues;
  if (!returnValues || returnValues?.[0][0][0] === 0) {
    return 0;
  } else {
    const valueType = returnValues[0][1];
    const valueData = returnValues[0][0];
    return Number(
      bcs.u64().parse(Uint8Array.from(valueData as Iterable<number>)),
    );
  }
}
