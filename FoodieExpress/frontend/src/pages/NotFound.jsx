import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FCF8F2] dark:bg-[#0B0F19] p-4 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-md">
        
        {/* Animated Graphic */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <span className="text-7xl block select-none animate-bounce">🍕</span>
          <span className="absolute -top-1 -right-1 text-3xl animate-pulse">❓</span>
        </div>

        <h2 className="text-6xl font-black text-slate-800 dark:text-white font-mono">404</h2>
        <h3 className="text-xl font-bold text-slate-705 dark:text-slate-200">Page Eaten by Cravings!</h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for doesn't exist, or it has been sliced and eaten by someone. Let's get you back to the main menu!
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3.5 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all text-sm"
        >
          Back to Home Page
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
