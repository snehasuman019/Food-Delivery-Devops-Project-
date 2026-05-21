import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to FoodieExpress!', {
        icon: '👋',
      });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      const msg = error.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950/20 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Login Card */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl relative overflow-hidden">
        
        {/* Decorative backdrop shape */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 blur-xl"></div>
        
        <div className="text-center relative z-10">
          <span className="text-4xl">🍔</span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Or{' '}
            <Link to="/signup" className="font-bold text-[#FF6B35] hover:text-[#E85A24] transition-colors">
              create a new Foodie account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-slate-405" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-11 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-slate-405" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <FiArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
          
          {/* Quick login helper info */}
          <div className="mt-4 p-3 bg-orange-50/50 dark:bg-slate-900/50 rounded-2xl border border-orange-500/10 text-center">
            <p className="text-xs font-semibold text-slate-500">
              Demo Credentials:
            </p>
            <div className="flex justify-around mt-1 text-[11px] text-[#FF6B35] font-mono">
              <div>
                <p>User: user@foodieexpress.com</p>
                <p>Pass: user123</p>
              </div>
              <div>
                <p>Admin: admin@foodieexpress.com</p>
                <p>Pass: admin123</p>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
