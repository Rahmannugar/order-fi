"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygonMumbai } from "wagmi/chains";
import { http } from "wagmi";
import type { ReactNode } from "react";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

if (!projectId) {
  console.warn(
    "[WARN] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set — WalletConnect features may be limited."
  );
}

const wagmiConfig = getDefaultConfig({
  appName: "OrderFi",
  projectId,
  chains: [mainnet, polygonMumbai],
  transports: {
    [mainnet.id]: http(),
    [polygonMumbai.id]: http(),
  },
});

export function WagmiProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
}
