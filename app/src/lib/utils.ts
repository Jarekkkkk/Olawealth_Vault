import { FountainInfo } from "bucket-protocol-sdk";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateRewardAmount(
  flowAmount: number,
  flowInterval: number,
) {
  return (flowAmount / 10 ** 9 / flowInterval) * 86400000;
}

export function calculateFountainAPR(
  fountain: FountainInfo,
  rewardsPrice: number,
) {
  const rewardAmount = calculateRewardAmount(
    fountain.flowAmount,
    fountain.flowInterval,
  );
  const lpPrice = 1;
  return (
    ((rewardAmount * 365) / ((fountain.totalWeight / 10 ** 9) * lpPrice)) *
    rewardsPrice *
    100
  );
}

export const calculateAutoCompoundAPY = (apr: number) => {
  if (apr === 0) return 0;
  // auto-compound every hour
  let n = 365 * 24;
  const apy = (1 + apr / 100 / n) ** n - 1;
  return apy * 100;
};
