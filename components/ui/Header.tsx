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
    <header className="sticky top-0 z-10 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-2">
          <svg
            className="h-7 w-7 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect
              x="3"
              y="7"
              width="18"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="white"
            />
            <path
              d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
            />
            <circle cx="17" cy="12" r="1.5" fill="currentColor" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold text-gray-700">
            OrderFi
          </h1>
        </div>
        <div className="hidden sm:block">
          <ConnectButton
            showBalance={true}
            accountStatus="address"
            chainStatus="icon"
          />
        </div>
        <div className="sm:hidden">
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            chainStatus="icon"
          />
        </div>
      </div>
      <div className="border-b border-gray-100" />
    </header>
  );
};

export default Header;
