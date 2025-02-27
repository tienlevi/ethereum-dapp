import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form";
import { Inputs } from "../interface/input";
import { erc20Abi, parseEther } from "viem";
import { usdtToken } from "../constants/token";
import styles from "./style.module.css";
import Input from "./Input";
import Button from "./Button";

function WriteContract() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const writeContract = useWriteContract();

  const handleWriteContract = async (data: Inputs) => {
    try {
      const response = await writeContract.writeContractAsync({
        abi: erc20Abi,
        address: usdtToken,
        functionName: "transfer",
        args: [data.address, parseEther(data.amount.toString())],
      });
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={styles.card}
    >
      <h1 style={{ textAlign: "center" }}>Write Contract</h1>
      <Input
        {...register("address", { required: "Pleace enter address" })}
        placeholder="Address"
        style={{ margin: "10px 0px" }}
      />
      {errors.address && (
        <p className={styles.error}>{errors.address?.message}</p>
      )}
      <Input
        {...register("amount", { required: "Pleace enter amount" })}
        placeholder="Amount"
        style={{ margin: "10px 0px" }}
      />
      {errors.amount && (
        <p className={styles.error}>{errors.amount?.message}</p>
      )}
      <Button
        style={{ margin: "10px 0px" }}
        onClick={handleSubmit(handleWriteContract)}
        disabled={writeContract.isPending}
      >
        {writeContract.isPending ? "Loading..." : "Send"}
      </Button>
    </div>
  );
}

export default WriteContract;
