import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia, sepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Ethereum DApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    baseSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
