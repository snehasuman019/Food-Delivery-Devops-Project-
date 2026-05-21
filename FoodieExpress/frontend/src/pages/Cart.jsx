import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import api from '../utils/api';
import { FiShoppingBag, FiCreditCard, FiMapPin, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please log in to place an order');
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    if (!address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }

    setLoading(true);
    try {
      // Map cartItems to format required by Backend Model
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      await api.post('/orders', {
        items: orderItems,
        total_amount: total,
        delivery_address: address.trim(),
      });

      toast.success('Order placed successfully!', {
        icon: '🎉',
        duration: 4000,
      });
      
      clearCart();
      navigate('/orders');
      
    } catch (error) {
      console.error('Order checkout error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FCF8F2] dark:bg-[#0B0F19] p-4 transition-colors duration-300">
        <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-md">
          <span className="text-7xl block select-none animate-bounce">🛒</span>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white">Your Cart is Empty</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Looks like you haven't added anything to your cart yet. Explore our delicious categories to satisfy your cravings.
          </p>
          <Link
            to="/menu"
            className="inline-block px-6 py-3.5 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all text-sm"
          >
            Browse Food Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8F2] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 pb-16 transition-colors duration-300">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-black flex items-center gap-2">
          <FiShoppingBag className="text-[#FF6B35]" />
          <span>My Shopping Cart</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-semibold">Review your tasty selection and checkout</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Checkout Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bill Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-md p-6 space-y-4">
              <h3 className="font-extrabold text-lg border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center gap-2">
                <FiCreditCard className="text-[#FF6B35]" />
                <span>Bill Summary</span>
              </h3>
              
              <div className="space-y-3.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-800 dark:text-slate-205">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <span>GST (5%)</span>
                  </span>
                  <span className="text-slate-800 dark:text-slate-205">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <FiTruck className="w-4 h-4 text-slate-400" />
                    <span>Delivery Fee</span>
                  </span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-extrabold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-slate-400 font-bold bg-orange-50 dark:bg-slate-900/30 p-2 rounded-lg border border-orange-500/10">
                    💡 Tip: Add ${(30 - subtotal).toFixed(2)} more to qualify for FREE delivery!
                  </p>
                )}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-center text-slate-800 dark:text-white font-extrabold text-lg">
                <span>Grand Total</span>
                <span className="text-2xl font-black text-[#FF6B35]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery address input */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-md p-6 space-y-4">
              <h3 className="font-extrabold text-lg border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center gap-2">
                <FiMapPin className="text-[#FF6B35]" />
                <span>Delivery Address</span>
              </h3>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <textarea
                    rows="3"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete home/office address..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 bg-gradient-to-r from-[#FF6B35] to-[#E63946] hover:from-[#E85A24] hover:to-[#D62839] text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 text-base"
                >
                  {loading ? (
                    <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    <span>Place Order & Pay</span>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
