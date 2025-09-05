"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useOrderStore } from "@/lib/stores/orderStore";
import { useEffect } from "react";

export const Header = () => {
  const { reset } = useOrderStore();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      reset();
    }
  }, [isConnected, reset]);

  return (
    <header className="w-full flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">OrderFi</h1>
      <ConnectButton
        showBalance={true}
        accountStatus="address"
        chainStatus="icon"
      />
    </header>
  );
};
