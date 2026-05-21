import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiSun, FiMoon, FiLayout } from 'react-icons/fi';
import { MdOutlineFastfood } from 'react-icons/md';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
      isActive
        ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-500/20'
        : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B35]'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
      isActive
        ? 'bg-[#FF6B35] text-white'
        : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-slate-800/50 glass transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-extrabold tracking-tight">
            <span className="p-2 bg-gradient-to-tr from-[#FF6B35] to-[#E63946] rounded-xl text-white shadow-lg shadow-orange-500/30">
              <MdOutlineFastfood className="w-6 h-6 animate-pulse-soft" />
            </span>
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#E63946] bg-clip-text text-transparent">
              FoodieExpress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
            {isAuthenticated && (
              <NavLink to="/orders" className={navLinkClass}>Orders</NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                <span className="flex items-center gap-1">
                  <FiLayout className="w-4 h-4" /> Admin
                </span>
              </NavLink>
            )}
          </div>

          {/* User Controls / Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 group">
              <FiShoppingCart className="w-5.5 h-5.5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E63946] text-white text-xs font-bold ring-2 ring-white dark:ring-slate-900 animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.name}</span>
                  <span className="text-xs text-slate-400 capitalize">{user?.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-[#E63946] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-5 py-2 font-semibold text-sm rounded-full text-[#FF6B35] hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 font-semibold text-sm rounded-full text-white bg-[#FF6B35] hover:bg-[#E85A24] shadow-md shadow-orange-500/10 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Buttons */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 rounded-full text-slate-700 dark:text-slate-200">
              <FiShoppingCart className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E63946] text-white text-xs font-bold ring-2 ring-white dark:ring-slate-900">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-72 max-w-sm bg-white dark:bg-[#111827] shadow-2xl border-l border-slate-100 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#E63946] bg-clip-text text-transparent">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-6 space-y-2">
          {user && (
            <div className="px-4 py-3 mb-4 rounded-xl bg-orange-50/50 dark:bg-slate-800/50 flex items-center space-x-3">
              <div className="p-2 bg-[#FF6B35]/10 rounded-full text-[#FF6B35]">
                <FiUser className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{user.name}</h4>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          )}
          
          <NavLink to="/" end onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>Home</NavLink>
          <NavLink to="/menu" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>Menu</NavLink>
          {isAuthenticated && (
            <NavLink to="/orders" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>Orders</NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>Admin Dashboard</NavLink>
          )}

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 dark:bg-red-950/20 text-[#E63946] font-semibold rounded-xl hover:bg-red-100 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 border border-[#FF6B35] text-[#FF6B35] font-semibold rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-semibold rounded-xl shadow-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
