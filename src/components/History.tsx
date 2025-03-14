import React from "react";
import { useAccount, useBalance } from "wagmi";
import { usdtToken } from "../constants/token";
import { Transaction } from "../interface/transaction";

interface Props {
  transactions?: Transaction[];
}

function History({ transactions }: Props) {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: usdtToken,
  });

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mb-2">Recent Transactions</div>
      {transactions?.map((transaction) => (
        <div className="bg-white p-3 rounded-2xl">
          <div className="text-[16px] leading-7">To: {transaction.address}</div>
          <div className="text-[16px] leading-7">
            Amount: {transaction.amount} {balance?.symbol}
          </div>
          <div className="text-[16px] leading-7">Hash: {transaction.hash}</div>
          <div className="text-[16px] leading-7">
            Date Transaction: {transaction.date}
          </div>
          <div className="text-[16px] leading-7">
            Status: <span className="text-green-500">{transaction.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
