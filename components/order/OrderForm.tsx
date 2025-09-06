"use client";

import { useState } from "react";
import { useCreateOrder } from "@/lib/hooks/useCreateOrder";
import { Order } from "@/lib/types/order";

interface OrderFormProps {
  onSuccess: (order: Order) => void;
}

const OrderForm = ({ onSuccess }: OrderFormProps) => {
  const { mutate, isPending } = useCreateOrder();
  const [formData, setFormData] = useState({
    amount: "",
    currency: "KES",
    token: "USDC",
    note: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form after successful submission
  const resetForm = () => {
    setFormData({
      amount: "",
      currency: "KES",
      token: "USDC",
      note: "",
    });
    setErrors({});
  };

  const validate = () => {
    const formErrors: Record<string, string> = {};

    // Amount validation
    if (!formData.amount) {
      formErrors.amount = "Amount is required";
    } else if (Number(formData.amount) <= 0) {
      formErrors.amount = "Amount must be greater than 0";
    } else if (isNaN(Number(formData.amount))) {
      formErrors.amount = "Amount must be a valid number";
    }

    // Currency validation
    if (!formData.currency) {
      formErrors.currency = "Currency is required";
    }

    // Token validation
    if (!formData.token) {
      formErrors.token = "Token is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutate(
      {
        amount: Number(formData.amount),
        currency: formData.currency,
        token: formData.token,
        note: formData.note || undefined,
      },
      {
        onSuccess: (order) => {
          onSuccess(order);
          resetForm();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors sm:text-sm"
            placeholder="0.00"
            disabled={isPending}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Currency <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, currency: e.target.value }))
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors sm:text-sm appearance-none"
              disabled={isPending}
            >
              <option value="KES">Kenyan Shilling (KES)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Token <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.token}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, token: e.target.value }))
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors sm:text-sm appearance-none"
              disabled={isPending}
            >
              <option value="USDC">USD Coin (USDC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Note <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={formData.note}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, note: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 sm:text-sm"
            placeholder="Add details about your order..."
            rows={3}
            disabled={isPending}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center cursor-pointer justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isPending ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Order
          </>
        )}
      </button>
    </form>
  );
};

export default OrderForm;
