import BasicDataField from "../fields/basicDataField";
import BasicInputField from "../fields/basicInputField";
import ActionButton from "../buttons/actionButton";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  useAccounts,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import {
  stBuckSavingVaultDeposit,
  stBuckSavingVaultWithdraw,
} from "@/lib/method";
import {
  BucketClient,
  COIN,
  COINS_TYPE_LIST,
  COIN_DECIMALS,
} from "bucket-protocol-sdk";
import { OLA_ST_SBUCK_TYPE } from "@/constants/config";
import { useGetSBUCKFountain } from "@/hooks/useGetSBUCKFountain";
import { PriceList } from "../../../type";
import { calculateAutoCompoundAPY } from "@/lib/utils";

const BasicContainer = () => {
  const [prices, setPrices] = useState<PriceList>();
  const { walletAddress, suiName } = useContext(AppContext);
  const [selectedToken, setSelectedToken] = useState<string>("BUCK");
  const { data: suiBalance } = useSuiClientQuery("getBalance", {
    owner: walletAddress ?? "",
    coinType: COINS_TYPE_LIST[selectedToken as COIN],
  });

  const client = useSuiClient();
  const [account] = useAccounts();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const fountain = useGetSBUCKFountain(prices?.["SUI"] || 0);
  const [inputValue, setInputValue] = useState("0");
  const userBalance = useMemo(() => {
    if (suiBalance?.totalBalance) {
      return Math.floor(
        Number(suiBalance?.totalBalance) /
          10 ** COIN_DECIMALS[selectedToken as COIN],
      );
    } else {
      return 0;
    }
  }, [suiBalance]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const bucketClient = new BucketClient();
        const data = await bucketClient.getPrices();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };
    fetchPrice();

    const pricesTimer = setInterval(fetchPrice, 10_000);
    return () => clearInterval(pricesTimer);
  }, [setPrices]);

  async function handleAction(action: "deposit" | "withdraw") {
    try {
      let tx = new Transaction();

      // PTB part
      if (action === "deposit") {
        const value_ = Math.floor(
          parseFloat(inputValue) * 10 ** COIN_DECIMALS[selectedToken as COIN],
        );
        tx = await stBuckSavingVaultDeposit(client, account.address, value_);
      } else {
        const value_ = Math.floor(parseFloat(inputValue) * 10 ** 9);
        tx = await stBuckSavingVaultWithdraw(client, account.address, value_);
      }

      // Dry run
      tx.setSender(account.address);
      const dryRunRes = await client.dryRunTransactionBlock({
        transactionBlock: await tx.build({ client }),
      });
      console.log("res", dryRunRes);
      if (dryRunRes.effects.status.status === "failure") {
        toast.error(dryRunRes.effects.status.error);
        return;
      }

      // Execute
      signAndExecuteTransaction(
        {
          transaction: tx,
        },
        {
          onSuccess: async (txRes) => {
            const finalRes = await client.waitForTransaction({
              digest: txRes.digest,
              options: {
                showEffects: true,
              },
            });
            toast.success("Tx Success!");
            console.log(finalRes);
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err);
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-[80%] flex flex-col items-center justify-center gap-4">
      <BasicDataField
        label="Your Wallet Balance"
        value={userBalance ?? "0.0000"}
        spaceWithUnit
        unit={selectedToken}
        minFractionDigits={0}
      />
      <BasicDataField
        label="APR"
        value={calculateAutoCompoundAPY(fountain?.apr ? fountain.apr + 4 : 0)}
        spaceWithUnit
        unit={"%"}
        minFractionDigits={0}
      />
      <BasicInputField
        label="Input"
        inputValue={inputValue}
        setInputValue={(value) => setInputValue(value)}
        tokenInfo={["SUI", "BUCK", "USDC", "USDT"]}
        canSelectToken={true}
        selectedToken={selectedToken}
        setSelectedToken={setSelectedToken}
        maxValue={0.0}
      />
      <div className="flex gap-4">
        <ActionButton
          label="Deposit"
          isConnected={true}
          isLoading={false}
          onClick={() => handleAction("deposit")}
          buttonClass="w-40"
        />
        <ActionButton
          label="Withdraw"
          isConnected={true}
          isLoading={false}
          onClick={() => handleAction("withdraw")}
          buttonClass="w-40"
        />
      </div>
    </div>
  );
};

export default BasicContainer;
