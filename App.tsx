
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import AdminSettings from './pages/admin/Settings';
import AdminLeads from './pages/admin/Leads';
import AdminServices from './pages/admin/Services';
import AdminProjects from './pages/admin/Projects';
import AdminProducts from './pages/admin/Products';
import AdminFAQ from './pages/admin/FAQ';
import AdminMedia from './pages/admin/Media';
import ServiceEditor from './pages/admin/ServiceEditor';
import ProjectEditor from './pages/admin/ProjectEditor';
import ProductEditor from './pages/admin/ProductEditor';
import LeadDetails from './pages/admin/LeadDetails';
import { SiteSettings } from './types';
import { MOCK_SETTINGS, ICONS } from './constants';
import { settingsService } from './services/settingsService';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [settings, setSettings] = useState<SiteSettings>(MOCK_SETTINGS as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') setIsAdmin(true);

    // تحميل الإعدادات من Supabase
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        // استخدم الإعدادات الافتراضية في حالة الفشل
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-cairo selection:bg-emerald-100 selection:text-emerald-900">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar settings={settings} />
              <main className="flex-grow">
                <Home key={settings.id} settings={settings} />
              </main>
              <Footer settings={settings} />
            </>
          } />
          
          <Route path="/projects" element={
            <>
              <Navbar settings={settings} />
              <main className="flex-grow">
                <Projects />
              </main>
              <Footer settings={settings} />
            </>
          } />

          <Route path="/admin/login" element={<AdminLogin onLogin={() => setIsAdmin(true)} />} />
          
          <Route path="/admin/*" element={
            isAdmin ? (
              <div className="flex min-h-screen bg-slate-100">
                <AdminSidebar />
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="settings" element={<AdminSettings settings={settings} onUpdate={setSettings} />} />
                    <Route path="leads" element={<AdminLeads />} />
                    <Route path="leads/:id" element={<LeadDetails />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="services/new" element={<ServiceEditor />} />
                    <Route path="services/edit/:id" element={<ServiceEditor />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="projects/new" element={<ProjectEditor />} />
                    <Route path="projects/edit/:id" element={<ProjectEditor />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/new" element={<ProductEditor />} />
                    <Route path="products/edit/:id" element={<ProductEditor />} />
                    <Route path="faq" element={<AdminFAQ />} />
                    <Route path="media" element={<AdminMedia />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                  </Routes>
                </div>
              </div>
            ) : <Navigate to="/admin/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
};

const AdminSidebar = () => {
  const menuItems = [
    { name: 'لوحة التحكم', path: '/admin/dashboard', icon: 'Dashboard' },
    { name: 'الخدمات', path: '/admin/services', icon: 'Content' },
    { name: 'المشاريع', path: '/admin/projects', icon: 'Media' },
    { name: 'المنتجات', path: '/admin/products', icon: 'Greenhouse' },
    { name: 'طلبات التواصل', path: '/admin/leads', icon: 'Leads' },
    { name: 'الوسائط', path: '/admin/media', icon: 'Media' },
    { name: 'الأسئلة الشائعة', path: '/admin/faq', icon: 'FAQ' },
    { name: 'إعدادات الموقع', path: '/admin/settings', icon: 'Settings' },
  ];

  return (
    <div className="w-20 lg:w-64 bg-slate-900 text-white p-4 lg:p-6 flex flex-col shrink-0 shadow-2xl transition-all">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">SR</div>
        <div className="text-xl font-black text-white tracking-tight hidden lg:block">نظام الإدارة</div>
      </div>
      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={`#${item.path}`}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-emerald-400 group relative"
            title={item.name}
          >
            {/* @ts-ignore */}
            <span className="scale-110 lg:scale-90 opacity-70 group-hover:opacity-100">{ICONS[item.icon]}</span>
            <span className="text-sm font-bold hidden lg:block">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="pt-10">
        <button 
          onClick={() => { localStorage.removeItem('admin_auth'); window.location.href = '#/'; }}
          className="w-full flex items-center gap-4 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-black text-sm"
        >
          <svg className="w-6 h-6 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span className="hidden lg:block">خروج</span>
        </button>
      </div>
    </div>
  );
};

export default App;
