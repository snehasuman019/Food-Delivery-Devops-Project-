import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronRight } from 'react-icons/fi';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950/20 py-16 sm:py-24 transition-colors duration-300">
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 text-4xl animate-float opacity-30 select-none hidden lg:block">🍕</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-float-delayed opacity-20 select-none hidden lg:block">🍔</div>
      <div className="absolute top-16 right-20 text-4xl animate-float opacity-30 select-none hidden lg:block">🍰</div>
      <div className="absolute bottom-16 right-40 text-5xl animate-float-delayed opacity-20 select-none hidden lg:block">🥤</div>
      
      {/* Background soft blur shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-200/40 dark:bg-orange-950/15 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-200/40 dark:bg-red-950/15 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-semibold text-sm border border-orange-500/10 dark:bg-[#FF6B35]/25">
              <span>🎉 Weekly Special: Free Delivery Over $30</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Delicious food, delivered to{' '}
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#E63946] bg-clip-text text-transparent">
                your doorstep
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-350 max-w-2xl mx-auto lg:mx-0">
              Craving something delicious? Order from the best local restaurants with super-fast delivery, real-time tracking, and amazing discounts.
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700/50 gap-2">
                <div className="flex items-center flex-1 px-3">
                  <FiSearch className="text-slate-400 w-5 h-5 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes, cuisines, or restaurants..."
                    className="w-full bg-transparent border-none text-slate-850 dark:text-white focus:outline-none placeholder-slate-400 text-sm py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95 text-sm"
                >
                  <span>Search</span>
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 max-w-lg mx-auto lg:mx-0">
              <div>
                <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">150+</h4>
                <p className="text-xs text-slate-500">Gourmet Partners</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">10k+</h4>
                <p className="text-xs text-slate-500">Happy Foodies</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">4.9★</h4>
                <p className="text-xs text-slate-500">Google Rating</p>
              </div>
            </div>

          </div>

          {/* Graphics Content */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF6B35]/30 dark:border-[#FF6B35]/20 animate-spin [animation-duration:40s]"></div>
              
              {/* Floating micro items */}
              <div className="absolute -top-4 left-1/4 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-float flex items-center space-x-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <h5 className="text-[10px] font-bold dark:text-white">Trending</h5>
                  <p className="text-[8px] text-slate-400">Hyderabadi Dum Biryani</p>
                </div>
              </div>

              <div className="absolute -bottom-4 right-1/4 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-float-delayed flex items-center space-x-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <h5 className="text-[10px] font-bold dark:text-white">Rating</h5>
                  <p className="text-[8px] text-slate-400">4.9 Average rating</p>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80"
                  alt="Delicious Food Spread"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
