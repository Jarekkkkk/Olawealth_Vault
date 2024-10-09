import { bcs, fromHex, toHex } from "@mysten/bcs";

const UID = bcs.fixedArray(32, bcs.u8()).transform({
  input: (id: string) => fromHex(id),
  output: (id) => toHex(Uint8Array.from(id)),
});
export const CoinBCS = bcs.struct("Coin", {
  id: UID,
  value: bcs.u64(),
});
