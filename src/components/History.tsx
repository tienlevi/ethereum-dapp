import React from "react";
import { useAccount, useBalance } from "wagmi";
import { usdtToken } from "../constants/token";
import { Transaction } from "../interface/transaction";
import Link from "next/link";
import { sepoliaBaseScanUrl } from "../constants";

interface Props {
  transactions?: Transaction[];
}

function History({ transactions }: Props) {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: usdtToken,
  });

  const renderStatus = (status: string) => {
    if (status === "pending")
      return <span className="text-yellow-500">Pending</span>;
    if (status === "completed")
      return <span className="text-green-500">Completed</span>;
    if (status === "failed")
      return <span className="text-red-500">Failed</span>;
  };

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mb-2">Recent Transactions</div>
      {transactions?.map((transaction) => (
        <div className="bg-white p-3 rounded-2xl my-2">
          <div className="text-[16px] leading-7">To: {transaction.address}</div>
          <div className="text-[16px] leading-7">
            Amount: {transaction.amount} {balance?.symbol}
          </div>
          <div className="text-[16px] leading-7 break-words">
            <span>Hash:</span>{" "}
            <Link
              className="text-blue-500"
              href={`${sepoliaBaseScanUrl}/tx/${transaction.hash}`}
            >
              {transaction.hash}
            </Link>
          </div>
          <div className="text-[16px] leading-7">
            Date Transaction: {transaction.date}
          </div>
          <div className="text-[16px] leading-7">
            Status:{" "}
            <span className={`text-green-500`}>
              {renderStatus(transaction.status!)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
