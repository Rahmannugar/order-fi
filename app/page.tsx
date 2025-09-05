"use client";
import { Header } from "@/components/Header";
import OrderForm from "@/components/order/OrderForm";
import OrderStatusCard from "@/components/order/OrderStatusCard";
import { useOrderStore } from "@/lib/stores/orderStore";

const HomePage = () => {
  const { order } = useOrderStore();
  return (
    <main className="max-w-2xl mx-auto py-10 space-y-8">
      <Header />
      {!order ? <OrderForm /> : <OrderStatusCard />}
    </main>
  );
};

export default HomePage;
