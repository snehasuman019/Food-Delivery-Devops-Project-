import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors duration-300">
      
      {/* Product info */}
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div>
          <h4 className="font-bold text-slate-800 dark:text-white text-base leading-tight">
            {item.name}
          </h4>
          <p className="text-xs text-slate-400 font-semibold">{item.restaurant}</p>
          <p className="text-sm font-black text-[#FF6B35] mt-1">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-6">
        {/* Quantity selectors */}
        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-[#FF6B35] transition-all"
          >
            <FiMinus className="w-3.5 h-3.5" />
          </button>
          
          <span className="w-6 text-center font-bold text-slate-800 dark:text-slate-200 text-sm">
            {item.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-[#FF6B35] transition-all"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price & Delete */}
        <div className="flex items-center space-x-4">
          <span className="text-base font-extrabold text-slate-800 dark:text-white w-20 text-right">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
            title="Remove item"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CartItem;
