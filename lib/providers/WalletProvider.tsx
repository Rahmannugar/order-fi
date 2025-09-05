"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, polygonMumbai } from "wagmi/chains";
import { http } from "wagmi";
import { useMemo, ReactNode } from "react";

interface WalletProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable is required"
    );
  }

  const wagmiConfig = useMemo(
    () =>
      getDefaultConfig({
        appName: "OrderFi",
        projectId,
        chains: [mainnet, polygonMumbai],
        transports: {
          [mainnet.id]: http(),
          [polygonMumbai.id]: http(),
        },
        ssr: true,
      }),
    [projectId]
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
