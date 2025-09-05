"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Wallet</h1>
      <p className="text-gray-600 mb-4">
        Connect your wallet to start placing and tracking orders.
      </p>
      <div className="rounded-xl border border-gray-200 shadow-md p-6">
        <ConnectButton
          showBalance={true}
          accountStatus="address"
          chainStatus="icon"
        />
      </div>
    </main>
  );
}
