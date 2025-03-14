import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form";
import { Inputs } from "../interface/input";
import { erc20Abi, parseEther } from "viem";
import { v4 as uuidv4 } from "uuid";
import { usdtToken } from "../constants/token";
import Input from "./Input";
import Button from "./Button";
import useTransactionStore from "../hooks/useTransactionStore";
import { toast } from "react-toastify";

function WriteContract() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const writeContract = useWriteContract();
  const { addTransaction, updateTransaction } = useTransactionStore();
  const id = uuidv4();

  const handleWriteContract = async (address: string, amount: any) => {
    const response = await writeContract.writeContractAsync({
      abi: erc20Abi,
      address: usdtToken as `0x${string}`,
      functionName: "transfer",
      args: [address as `0x${string}`, parseEther(amount.toString())],
    });
    return response;
  };

  const sendBalance = async (data: Inputs) => {
    const addresses = data.address
      .split(",")
      .map((key) => key.trim())
      .filter((key) => key.length > 0);

    const hashes: string[] = [];

    addTransaction({
      id: id,
      address: data.address,
      status: "pending",
      hash: "",
      amount: Number(data.amount),
      date: new Date().toLocaleString(),
    });
    for (const address of addresses) {
      try {
        const hash = await handleWriteContract(address, data.amount);
        hashes.push(hash!);
        toast.success("Transaction created successfully");
        updateTransaction(id, {
          address: address,
          status: "completed",
          hash: hash,
          date: new Date().toLocaleString(),
        });
      } catch (error) {
        updateTransaction(id, {
          address: address,
          status: "failed",
          hash: "",
          date: new Date().toLocaleString(),
        });
      }
    }
  };

  return (
    <div className={`w-full flex flex-col bg-white p-3 rounded-2xl`}>
      <Input
        {...register("address", { required: "Pleace enter address" })}
        label="Recipient Address"
        className="my-3"
      />
      {errors.address && (
        <p className={`text-red-500`}>{errors.address?.message}</p>
      )}
      <Input
        {...register("amount", { required: "Pleace enter amount" })}
        label="Amount"
        className="my-3"
      />
      {errors.amount && (
        <p className={`text-red-500`}>{errors.amount?.message}</p>
      )}

      <Button
        style={{ margin: "10px 0px" }}
        onClick={handleSubmit(sendBalance)}
        disabled={writeContract.isPending}
      >
        {writeContract.isPending ? "Loading..." : "Send"}
      </Button>
    </div>
  );
}

export default WriteContract;
