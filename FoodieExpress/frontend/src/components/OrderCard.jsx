import React from 'react';
import { FiClock, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const statusConfig = {
  Pending: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400', progress: 15 },
  Preparing: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400', progress: 45 },
  'Out for Delivery': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400', progress: 75 },
  Delivered: { color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400', progress: 100 }
};

const OrderCard = ({ order }) => {
  const config = statusConfig[order.status] || { color: 'bg-slate-100 text-slate-800', progress: 0 };
  
  // Format Date
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-md p-6 space-y-6 transition-colors duration-300">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 dark:border-slate-700/50 gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider">ORDER ID</span>
          <h4 className="font-extrabold text-slate-800 dark:text-white text-base font-mono">#{order.id.slice(-8).toUpperCase()}</h4>
          <span className="flex items-center text-xs text-slate-400 mt-1 font-semibold">
            <FiClock className="w-3.5 h-3.5 mr-1" />
            {formatDate(order.created_at)}
          </span>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${config.color}`}>
          {order.status}
        </span>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        <h5 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ordered Items</h5>
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-700/10">
              <div className="flex items-center space-x-3">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                )}
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">{item.name}</p>
                  <p className="text-xs text-slate-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <span className="font-extrabold text-sm text-slate-800 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Address & Status Line */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <FiMapPin className="text-slate-400 w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block text-slate-700 dark:text-slate-350">Delivery Address</span>
            <span className="text-xs">{order.delivery_address}</span>
          </div>
        </div>

        {/* Progress bar visualizer */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            <span className={order.status === 'Pending' ? 'text-[#FF6B35]' : ''}>Pending</span>
            <span className={order.status === 'Preparing' ? 'text-blue-500' : ''}>Preparing</span>
            <span className={order.status === 'Out for Delivery' ? 'text-orange-500' : ''}>On the Way</span>
            <span className={order.status === 'Delivered' ? 'text-emerald-500' : ''}>Delivered</span>
          </div>
          <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-750 rounded-full overflow-hidden">
            <div
              style={{ width: `${config.progress}%` }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF6B35] to-[#E63946] rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Total Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Paid Amount</span>
        <span className="text-2xl font-black text-[#FF6B35]">${order.total_amount.toFixed(2)}</span>
      </div>

    </div>
  );
};

export default OrderCard;
