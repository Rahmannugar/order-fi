import { Order } from "@/lib/types/order";

interface OrderStatusCardProps {
  order: Order;
}

const OrderStatusCard = ({ order }: OrderStatusCardProps) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "settled":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Order #{order.order_id}</h3>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Amount</span>
          <span className="font-medium">
            {order.amount} {order.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Token</span>
          <span className="font-medium">{order.token}</span>
        </div>
        {order.note && (
          <div className="flex justify-between">
            <span className="text-gray-600">Note</span>
            <span className="font-medium">{order.note}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Created</span>
          <span className="font-medium">
            {new Date(order.created_at).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;