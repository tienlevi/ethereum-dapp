import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form";
import { Inputs } from "../interface/input";
import { erc20Abi, parseEther } from "viem";
import { usdtToken } from "../constants/token";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { sepoliaBaseScanUrl } from "../constants";

function WriteContract() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const writeContract = useWriteContract();

  const handleWriteContract = async (address: string, amount: any) => {
    const response = await writeContract.writeContractAsync({
      abi: erc20Abi,
      address: usdtToken as `0x${string}`,
      functionName: "transfer",
      args: [address as `0x${string}`, parseEther(amount.toString())],
    });
    console.log(response);
    return response;
  };

  console.log(writeContract.data);

  const sendBalance = async (data: Inputs) => {
    const addresses = data.address
      .split(",")
      .map((key) => key.trim())
      .filter((key) => key.length > 0);

    console.log("Addresses:", addresses);

    const hashes: string[] = [];
    const createKeys = addresses.map((key) => ({
      privateKey: key,
      status: "Created Transaction",
      hashes: "",
    }));
    // setResult(createKeys as []);

    for (const address of addresses) {
      try {
        const hash = await handleWriteContract(address, data.amount);
        hashes.push(hash!);
        const resultKeys = addresses.map((key, index) => ({
          privateKey: key,
          status: index < hashes.length ? "Completed" : "Pending",
          hashes: index < hashes.length ? hashes[index] : "",
        }));
        // setResult(resultKeys as []);
      } catch (error) {
        const resultKeys = addresses.map((key, index) => ({
          privateKey: key,
          status: index < hashes.length ? "Completed" : "Failed",
          hashes: index < hashes.length ? hashes[index] : "",
        }));
        // setResult(resultKeys as []);
      }
    }
  };

  return (
    <div className={`w-full flex flex-col bg-white p-3 rounded-2xl`}>
      <Input
        {...register("address", { required: "Pleace enter address" })}
        placeholder="Address"
        className="my-3"
      />
      {errors.address && <p className={``}>{errors.address?.message}</p>}
      <Input
        {...register("amount", { required: "Pleace enter amount" })}
        placeholder="Amount"
        className="my-3"
      />
      {errors.amount && <p className={``}>{errors.amount?.message}</p>}
      {writeContract.status === "success" && (
        <div>
          <span>Hash is: </span>
          <Link
            target="_blank"
            style={{ wordBreak: "break-all", color: "blue" }}
            href={`${sepoliaBaseScanUrl}/tx/${writeContract.data}`}
          >
            {writeContract.data}
          </Link>
        </div>
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
