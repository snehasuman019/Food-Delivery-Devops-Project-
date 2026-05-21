import React from 'react';
import { FiStar, FiClock } from 'react-icons/fi';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount Tag */}
        {restaurant.discount && (
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-black tracking-wide uppercase text-white bg-gradient-to-r from-[#E63946] to-[#FF6B35] shadow-md">
            {restaurant.discount}
          </span>
        )}
      </div>

      {/* Details info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-slate-850 dark:text-white group-hover:text-[#FF6B35] transition-colors leading-tight line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-xs text-slate-400 font-semibold">{restaurant.cuisines.join(', ')}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50 text-xs font-bold text-slate-500 dark:text-slate-400">
          {/* Rating */}
          <span className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-lg">
            <FiStar className="fill-emerald-600 w-3.5 h-3.5" />
            <span>{restaurant.rating}</span>
          </span>

          {/* Delivery Time */}
          <span className="flex items-center space-x-1">
            <FiClock className="w-4 h-4 text-slate-400" />
            <span>{restaurant.deliveryTime} mins</span>
          </span>

          {/* Cost for Two */}
          <span>${restaurant.costForTwo} for two</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
