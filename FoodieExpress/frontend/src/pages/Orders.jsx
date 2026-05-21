import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import OrderCard from '../components/OrderCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiClock, FiShoppingBag } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-[#FCF8F2] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 pb-16 transition-colors duration-300">
      
      {/* Title */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black flex items-center gap-2">
          <FiClock className="text-[#FF6B35]" />
          <span>My Order History</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-semibold">Track and review your placed orders</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-8 shadow-sm">
            <span className="text-7xl block select-none">🍲</span>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">No Orders Placed Yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-450 max-w-sm mx-auto">
              You haven't placed any orders yet. Head to our food menu and order your favorite dishes!
            </p>
            <Link
              to="/menu"
              className="inline-block px-6 py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all text-sm"
            >
              Order Food Now
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Orders;
