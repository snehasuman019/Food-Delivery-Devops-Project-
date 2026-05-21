import React from 'react';

const categoryEmojiMap = {
  All: '🍽️',
  Pizza: '🍕',
  Burgers: '🍔',
  Biryani: '🍛',
  Chinese: '🥢',
  Desserts: '🍰',
  Drinks: '🥤'
};

const CategoryCard = ({ category, isActive, onClick }) => {
  const emoji = categoryEmojiMap[category] || '🍔';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-4 rounded-2xl min-w-[90px] text-center transition-all duration-300 transform active:scale-95 ${
        isActive
          ? 'bg-[#FF6B35] text-white shadow-lg shadow-orange-500/25 -translate-y-1'
          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/50 hover:border-[#FF6B35]/50 hover:shadow-md'
      }`}
    >
      <span className="text-3xl mb-2 filter drop-shadow-md">{emoji}</span>
      <span className="text-xs font-bold tracking-wide">{category}</span>
    </button>
  );
};

export default CategoryCard;
