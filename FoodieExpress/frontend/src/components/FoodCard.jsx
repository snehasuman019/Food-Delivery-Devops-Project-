import React from 'react';
import { FiStar, FiShoppingCart, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(food);
    toast.success(`${food.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
      },
    });
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white bg-slate-900/60 backdrop-blur-md">
          {food.category}
        </span>
        {/* Quick Add Button overlay */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#FF6B35] hover:bg-[#E85A24] text-white shadow-lg transition-transform transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
          title="Add to Cart"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>

      {/* Info Content */}
      <div className="flex-1 p-5 space-y-3 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1">
              {food.name}
            </h3>
            {/* Rating badge */}
            <span className="flex items-center space-x-1 text-xs font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md">
              <span>{food.rating}</span>
              <FiStar className="fill-white w-3 h-3" />
            </span>
          </div>
          <p className="text-xs text-slate-400 font-semibold">{food.restaurant}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 pt-1 font-medium">
            {food.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
          <span className="text-2xl font-black text-[#FF6B35]">
            ${food.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-white bg-[#FF6B35] hover:bg-[#E85A24] rounded-xl shadow-md shadow-orange-500/10 active:scale-95 transition-all"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
