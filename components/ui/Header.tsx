"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useOrderStore } from "@/lib/stores/orderStore";
import { useEffect } from "react";

const Header = () => {
  const { reset } = useOrderStore();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) reset();
  }, [isConnected, reset]);

  return (
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">OrderFi</h1>
        <ConnectButton
          showBalance={true}
          accountStatus="address"
          chainStatus="icon"
        />
      </div>
    </header>
  );
};

export default Header;
