"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useCreateOrder } from "@/lib/hooks/useCreateOrder";

const OrderForm = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("KES");
  const [token, setToken] = useState("USDC");
  const [note, setNote] = useState("");
  const { mutate: createOrder, isPending, isError, error } = useCreateOrder();
  const { isConnected } = useAccount();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) return;
    createOrder({ amount, currency, token, note });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold">Create a new order</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-md border px-3 py-2"
          min={1}
          required
          disabled={!isConnected}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Currency</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
          disabled={!isConnected}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
          disabled={!isConnected}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={!isConnected}
        />
      </div>

      <button
        type="submit"
        disabled={!isConnected || isPending}
        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {!isConnected
          ? "Connect wallet to continue"
          : isPending
          ? "Creating..."
          : "Create Order"}
      </button>

      {isError && <p className="text-sm text-red-600">{error.message}</p>}
    </form>
  );
};

export default OrderForm;
