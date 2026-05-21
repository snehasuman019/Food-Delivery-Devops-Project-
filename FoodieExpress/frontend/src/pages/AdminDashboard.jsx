import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiPlus, FiTrash2, FiShoppingBag, FiLayers, FiDollarSign, FiPlusCircle, FiX, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('foods'); // foods, orders
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Stats
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalFoods: 0
  });

  // Add food form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    price: '',
    category: 'Pizza',
    image: '',
    description: '',
    restaurant: '',
    rating: 4.5
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch foods
      const foodsResponse = await api.get('/foods');
      setFoods(foodsResponse.data);

      // Fetch all orders
      const ordersResponse = await api.get('/orders/all');
      const allOrders = ordersResponse.data;
      setOrders(allOrders);

      // Calculate stats
      const revenue = allOrders.reduce((sum, order) => {
        return order.status === 'Delivered' ? sum + order.total_amount : sum;
      }, 0);

      setStats({
        totalOrders: allOrders.length,
        totalRevenue: revenue,
        totalFoods: foodsResponse.data.length
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete food item
  const handleDeleteFood = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    try {
      await api.delete(`/foods/${id}`);
      toast.success('Food item deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Delete food error:', error);
      toast.error('Failed to delete food item');
    }
  };

  // Update order status
  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success(`Order status updated to ${status}`);
      fetchData();
    } catch (error) {
      console.error('Update status error:', error);
      toast.error('Failed to update status');
    }
  };

  // Add food handler
  const handleAddFoodSubmit = async (e) => {
    e.preventDefault();
    if (!newFood.name || !newFood.price || !newFood.image) {
      toast.error('Please enter Name, Price, and Image URL');
      return;
    }
    try {
      await api.post('/foods', newFood);
      toast.success('Food item added successfully');
      setShowAddModal(false);
      setNewFood({
        name: '',
        price: '',
        category: 'Pizza',
        image: '',
        description: '',
        restaurant: '',
        rating: 4.5
      });
      fetchData();
    } catch (error) {
      console.error('Add food error:', error);
      toast.error('Failed to add food item');
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-[#FCF8F2] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 pb-16 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1 font-semibold">Manage your menu offerings and client order streams</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl flex items-center space-x-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all text-sm"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Dish</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-center space-x-4">
            <span className="p-4 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl">
              <FiDollarSign className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-450 uppercase tracking-wider">Completed Revenue</p>
              <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1">${stats.totalRevenue.toFixed(2)}</h4>
            </div>
          </div>

          {/* Orders count */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-center space-x-4">
            <span className="p-4 bg-orange-105 dark:bg-orange-950/40 text-[#FF6B35] rounded-2xl">
              <FiShoppingBag className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-450 uppercase tracking-wider">Total Order Flow</p>
              <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{stats.totalOrders}</h4>
            </div>
          </div>

          {/* Foods count */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-center space-x-4">
            <span className="p-4 bg-blue-100 dark:bg-blue-950/40 text-blue-500 rounded-2xl">
              <FiLayers className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-450 uppercase tracking-wider">Menu Dishes Count</p>
              <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{stats.totalFoods} items</h4>
            </div>
          </div>
        </div>

        {/* Tab Controllers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('foods')}
            className={`px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all ${
              activeTab === 'foods'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Manage Menu Dishes
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Manage Order Operations
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden">
          
          {activeTab === 'foods' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm font-semibold">
                  {foods.map((food) => (
                    <tr key={food.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      <td className="py-4 px-6">
                        <img src={food.image} alt={food.name} className="w-12 h-12 object-cover rounded-xl" />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">{food.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{food.restaurant}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-350">{food.category}</td>
                      <td className="py-4 px-6 font-bold text-[#FF6B35]">${food.price.toFixed(2)}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDeleteFood(food.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                          title="Delete Food Item"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">User Email</th>
                    <th className="py-4 px-6">Items Summary</th>
                    <th className="py-4 px-6">Total Bill</th>
                    <th className="py-4 px-6">Status Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm font-semibold">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      <td className="py-4 px-6 font-mono font-bold text-slate-800 dark:text-white">
                        #{order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-350">{order.user_email}</td>
                      <td className="py-4 px-6 max-w-xs">
                        <p className="truncate text-slate-600 dark:text-slate-400" title={order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}>
                          {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </p>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#FF6B35]">${order.total_amount.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF6B35] dark:text-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

      {/* Add Food Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-2xl w-full max-w-lg p-6 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold flex items-center gap-1">
                <FiPlusCircle className="text-[#FF6B35] w-5 h-5" />
                <span>Add Dish to Menu</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFoodSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Food Name</label>
                <input
                  type="text"
                  required
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  placeholder="e.g. Pepperoni Feast Pizza"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Category</label>
                <select
                  value={newFood.category}
                  onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newFood.price}
                  onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                  placeholder="e.g. 14.99"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>

              {/* Image URL */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Image URL</label>
                <input
                  type="url"
                  required
                  value={newFood.image}
                  onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>

              {/* Restaurant */}
              <div>
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Restaurant</label>
                <input
                  type="text"
                  value={newFood.restaurant}
                  onChange={(e) => setNewFood({ ...newFood, restaurant: e.target.value })}
                  placeholder="e.g. Pizzeria Kitchen"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={newFood.rating}
                  onChange={(e) => setNewFood({ ...newFood, rating: e.target.value })}
                  placeholder="e.g. 4.5"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-450 uppercase mb-2">Description</label>
                <textarea
                  rows="2"
                  value={newFood.description}
                  onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                  placeholder="Briefly describe this dish..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white resize-none"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 text-sm"
                >
                  Create Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
