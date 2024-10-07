import { SHARED_OBJECTS } from "@/constants/config";
import { extractGenericType } from "@/lib/utils";
import { useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { normalizeStructTag } from "@mysten/sui/utils";

export interface BUCKStSBUCKVault {
  id: string;
  type_x: string;
  type_y: string;
  free_balance: number;
  locked_balance: number;
  unlocked_balance: number;
  strategies: Record<string, number>;
  lp_treasury: number;
}

export const useGetBuckStSBUCKVault = () => {
  const suiClient = useSuiClient();
  return useQuery<BUCKStSBUCKVault>({
    queryKey: ["Vault<BUCK, ST-SBUCK>"],
    queryFn: async () => {
      const id = SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT.objectId;
      const res = await suiClient.getObject({
        id,
        options: { showContent: true, showType: true },
      });
      // type
      const type = extractGenericType(res?.data?.type as string);
      if (!type) {
        throw new Error(
          "Missing object type. Make sure to fetch the object with `showType: true`",
        );
      }
      const [X, Y] =
        type
          ?.slice(type.indexOf("<") + 1, type.indexOf(">"))
          .split(",")
          .map((t) => normalizeStructTag(t.trim())) ?? [];
      // fields
      const content = res.data?.content as any;
      if (!content) {
        throw new Error(
          "Missing object content. Make sure to fetch the object with `showContent: true`",
        );
      }
      const fields = content.fields as Record<string, any>;
      const strategies = fields.strategies.fields.contents.reduce(
        (res: any, str: any) => {
          const vaultAccessId = str.fields.key;
          const borrowed = str.fields.value.fields.borrowed;
          res[vaultAccessId] = Number(borrowed);
          return res;
        },
        {} as Record<string, number>,
      );
      return {
        id,
        type_x: X,
        type_y: Y,
        free_balance: Number(fields.free_balance),
        locked_balance: Number(fields.time_locked_profit.fields.locked_balance),
        unlocked_balance: Number(
          fields.time_locked_profit.fields.unlocked_balance,
        ),
        strategies,
        lp_treasury: Number(
          fields.lp_treasury.fields.total_supply.fields.value,
        ),
      };
    },
    enabled: !!suiClient,
  });
};
