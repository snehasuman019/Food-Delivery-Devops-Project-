import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import { MdOutlineFastfood } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-350 dark:bg-slate-950 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Info */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-black text-white">
              <span className="p-2 bg-[#FF6B35] rounded-xl">
                <MdOutlineFastfood className="w-6 h-6 text-white" />
              </span>
              <span>FoodieExpress</span>
            </Link>
            <p className="text-sm text-slate-400">
              Satisfying your cravings by delivering fresh, hot, and delicious food right from your favorite kitchens to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-[#FF6B35] hover:text-white transition-all">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-[#FF6B35] hover:text-white transition-all">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-[#FF6B35] hover:text-white transition-all">
                <FiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-[#FF6B35] transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-[#FF6B35] transition-colors">Food Menu</Link></li>
              <li><Link to="/cart" className="hover:text-[#FF6B35] transition-colors">My Cart</Link></li>
              <li><Link to="/orders" className="hover:text-[#FF6B35] transition-colors">Order History</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <FiMapPin className="text-[#FF6B35] w-5 h-5 flex-shrink-0" />
                <span>123 Gourmet Street, Food City, FC 56789</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="text-[#FF6B35] w-4 h-4 flex-shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="text-[#FF6B35] w-4 h-4 flex-shrink-0" />
                <span>support@foodieexpress.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to get special discounts, offers, and weekly chef specials.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 rounded-l-xl bg-slate-800 text-white border-none focus:ring-2 focus:ring-[#FF6B35] text-sm"
              />
              <button
                type="submit"
                className="px-4 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold rounded-r-xl text-sm transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} FoodieExpress. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
