"use client";

import { WagmiProviderWrapper } from "./WalletProvider";
import { ReactQueryProvider } from "./QueryProvider";
import type { ReactNode } from "react";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProviderWrapper>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </WagmiProviderWrapper>
  );
}
