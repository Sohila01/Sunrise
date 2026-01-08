
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteSettings } from '../types';

const Navbar: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = (isScrolled || !isHome) ? 'text-slate-900' : 'text-white';
  const bgColor = (isScrolled || !isHome) ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            SR
          </div>
          <div className={`font-bold text-lg hidden sm:block ${textColor}`}>
            {settings.company_name_ar}
          </div>
        </Link>

        <div className={`hidden md:flex gap-8 font-semibold ${textColor}`}>
          <Link to="/" className="hover:text-emerald-500 transition-colors">الرئيسية</Link>
          <a href="/#services" className="hover:text-emerald-500 transition-colors">خدماتنا</a>
          <Link to="/projects" className="hover:text-emerald-500 transition-colors">مشاريعنا</Link>
          <a href="/#contact" className="hover:text-emerald-500 transition-colors">اتصل بنا</a>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-bold transition-all active:scale-95 shadow-lg">
          طلب عرض سعر
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
