import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiArrowRight } from 'react-icons/fi';

const categories = ['All', 'Pizza', 'Burgers', 'Biryani', 'Chinese', 'Desserts', 'Drinks'];

const mockRestaurants = [
  {
    name: "La Pino'z Pizzeria",
    cuisines: ["Pizza", "Italian", "Fast Food"],
    rating: 4.5,
    deliveryTime: 25,
    costForTwo: 20,
    discount: "50% OFF up to $10",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    name: "Burger King",
    cuisines: ["Burgers", "American", "Sides"],
    rating: 4.4,
    deliveryTime: 20,
    costForTwo: 15,
    discount: "Free fries on $15+",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    name: "Behrouz Biryani",
    cuisines: ["Biryani", "Mughlai", "North Indian"],
    rating: 4.8,
    deliveryTime: 35,
    costForTwo: 25,
    discount: "Flat 20% OFF",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600"
  },
  {
    name: "Mainland China",
    cuisines: ["Chinese", "Asian", "Noodles"],
    rating: 4.6,
    deliveryTime: 30,
    costForTwo: 30,
    discount: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600"
  }
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      try {
        const response = await api.get('/foods');
        // display top 4 items as featured
        setFoods(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured foods:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedFoods();
  }, []);

  return (
    <div className="space-y-16 pb-16 bg-[#FCF8F2] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Header */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Categories Section */}
        <section className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight">In the mood for...?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Select a category to filter your favorite cravings</p>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-500 justify-start md:justify-center">
            {categories.map((cat) => (
              <Link to={`/menu?category=${cat}`} key={cat}>
                <CategoryCard
                  category={cat}
                  isActive={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Our Signature Dishes</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Handpicked favorites that foodies love the most</p>
            </div>
            <Link
              to="/menu"
              className="flex items-center space-x-1.5 text-sm font-bold text-[#FF6B35] hover:text-[#E85A24] transition-colors"
            >
              <span>View All Menu</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {foods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          )}
        </section>

        {/* Popular Restaurants Section */}
        <section className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight">Popular Restaurants</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Local legendary kitchens delivering premium dishes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockRestaurants.map((restaurant, idx) => (
              <Link to="/menu" key={idx}>
                <RestaurantCard restaurant={restaurant} />
              </Link>
            ))}
          </div>
        </section>

        {/* "How it Works" Info Grid */}
        <section className="py-12 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700/50 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight">How FoodieExpress Works</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Get your favorite food delivered in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/40 text-[#FF6B35] font-black text-xl">1</span>
              <h3 className="font-bold text-lg">Choose Your Food</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450">Browse local menus, search for cuisines, and select the finest dishes.</p>
            </div>
            <div className="space-y-3 p-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-[#E63946] font-black text-xl">2</span>
              <h3 className="font-bold text-lg">Fast Checkout</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450">Add items to your cart, set your delivery address, and place your order.</p>
            </div>
            <div className="space-y-3 p-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 text-[#FFB703] font-black text-xl">3</span>
              <h3 className="font-bold text-lg">Hot Delivery</h3>
              <p className="text-sm text-slate-500 dark:text-slate-450">Our delivery heroes fetch your order quickly, keeping it fresh and hot.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
