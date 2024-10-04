import { calculateFountainAPR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BucketClient, SBUCK_BUCK_LP_REGISTRY_ID } from "bucket-protocol-sdk";
import { useMemo } from "react";

export const useGetSBUCKFountain = (suiPrice?: number) => {
  const { data: fountain } = useQuery({
    queryKey: ["sBUCK-fountain"],
    queryFn: async () => {
      const bucketClient = new BucketClient();
      return await bucketClient.getFountain(SBUCK_BUCK_LP_REGISTRY_ID);
    },
    enabled: !!suiPrice,
  });

  return useMemo(() => {
    if (!fountain || !suiPrice) return null;
    const apr = calculateFountainAPR(fountain, suiPrice);

    return { fountainInfo: fountain, apr };
  }, [suiPrice, fountain]);
};
