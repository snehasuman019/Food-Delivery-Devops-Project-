import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success('Account created successfully! Welcome!', {
        icon: '🚀',
      });
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Signup error:', error);
      const msg = error.response?.data?.message || 'Error occurred during registration';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950/20 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Signup Card */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl relative overflow-hidden">
        
        {/* Accent bubble */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 blur-xl"></div>
        
        <div className="text-center relative z-10">
          <span className="text-4xl">🍕</span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#FF6B35] hover:text-[#E85A24] transition-colors">
              Log in instead
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-slate-405" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-11 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>
            </div>

            {/* Email Input */}
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
                  placeholder="john@example.com"
                  className="pl-11 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>
            </div>

            {/* Password Input */}
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
                  placeholder="Min 6 characters"
                  className="pl-11 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-slate-405" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="pl-11 w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm dark:text-white"
                />
              </div>
            </div>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Register Now</span>
                  <FiArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;
