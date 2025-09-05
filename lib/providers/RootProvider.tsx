"use client";

import { WalletProvider } from "./WalletProvider";
import type { ReactNode } from "react";

export function RootProvider({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
