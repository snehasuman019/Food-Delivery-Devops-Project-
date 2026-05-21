import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import FoodCard from '../components/FoodCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiSearch, FiSliders } from 'react-icons/fi';

const categories = ['All', 'Pizza', 'Burgers', 'Biryani', 'Chinese', 'Desserts', 'Drinks'];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating'); // rating, price-asc, price-desc
  
  const activeCategory = searchParams.get('category') || 'All';
  const activeSearch = searchParams.get('search') || '';

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory && activeCategory !== 'All') {
          params.category = activeCategory;
        }
        if (activeSearch) {
          params.search = activeSearch;
        }
        
        const response = await api.get('/foods', { params });
        
        // Apply client side sorting
        let sortedData = [...response.data];
        if (sortBy === 'rating') {
          sortedData.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'price-asc') {
          sortedData.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
          sortedData.sort((a, b) => b.price - a.price);
        }
        
        setFoods(sortedData);
      } catch (error) {
        console.error('Error loading foods:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFoods();
  }, [activeCategory, activeSearch, sortBy]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ category: activeCategory, search: value });
    } else {
      setSearchParams({ category: activeCategory });
    }
  };

  const handleCategorySelect = (category) => {
    const params = { category };
    if (activeSearch) params.search = activeSearch;
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-[#FCF8F2] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 pb-16 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-12 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Explore Our Delicious Menu</h1>
          <p className="text-sm sm:text-base text-orange-100 font-medium max-w-xl mx-auto">
            Discover a wide variety of cuisines prepared with love by professional local kitchens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          
          {/* Search Field */}
          <div className="relative w-full md:max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={activeSearch}
              onChange={handleSearchChange}
              placeholder="Search by food name, restaurant..."
              className="pl-11 w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
            />
          </div>

          {/* Sort Controller */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <FiSliders className="text-slate-400 w-4 h-4 hidden sm:block" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] dark:text-white"
            >
              <option value="rating">Top Rated ⭐</option>
              <option value="price-asc">Price: Low to High 📈</option>
              <option value="price-desc">Price: High to Low 📉</option>
            </select>
          </div>

        </div>

        {/* Category Horizontal Bar */}
        <div className="flex space-x-3 overflow-x-auto pb-2 justify-start scrollbar-thin">
          {categories.map((cat) => (
            <CategoryCard
              key={cat}
              category={cat}
              isActive={activeCategory === cat}
              onClick={() => handleCategorySelect(cat)}
            />
          ))}
        </div>

        {/* Foods Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-8 shadow-sm">
            <span className="text-6xl select-none block">🔍</span>
            <h3 className="text-xl font-bold text-slate-805 dark:text-white">No Dishes Found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              We couldn't find any dishes matching your filters. Try checking your spelling or selecting another category.
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-xl transition-all shadow-md text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
