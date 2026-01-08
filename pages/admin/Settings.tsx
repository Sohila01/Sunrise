
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../types';
import { settingsService } from '../../services/settingsService';

interface Props {
  settings: SiteSettings;
  onUpdate: (settings: SiteSettings) => void;
}

const AdminSettings: React.FC<Props> = ({ settings, onUpdate }) => {
  const [formData, setFormData] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      const updated = await settingsService.updateSettings(formData);
      onUpdate(updated);
      setSuccessMessage('تم حفظ الإعدادات بنجاح! ✅');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Failed to update settings:', error);
      const errorMsg = error?.message || 'فشل في حفظ الإعدادات';
      setErrorMessage(`❌ خطأ: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black mb-10">إعدادات الموقع والهوية</h1>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-xl font-bold">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-xl font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">المعلومات الأساسية</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-bold mb-2">اسم الشركة (عربي)</label>
              <input 
                type="text" 
                value={formData.company_name_ar}
                onChange={(e) => setFormData({...formData, company_name_ar: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2">اسم الشركة (English)</label>
              <input 
                type="text" 
                value={formData.company_name_en}
                onChange={(e) => setFormData({...formData, company_name_en: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">الشعار التسويقي (Tagline عربي)</label>
            <textarea 
              value={formData.tagline_ar}
              onChange={(e) => setFormData({...formData, tagline_ar: e.target.value})}
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">الشعار التسويقي (Tagline English)</label>
            <textarea 
              value={formData.tagline_en}
              onChange={(e) => setFormData({...formData, tagline_en: e.target.value})}
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">التصميم والألوان</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-slate-700 font-bold mb-4">اللون الأساسي</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={formData.primary_color}
                  onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                  className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer"
                />
                <span className="text-slate-500 font-mono uppercase">{formData.primary_color}</span>
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2">اللون الثانوي</label>
              <input 
                type="color" 
                value={formData.secondary_color}
                onChange={(e) => setFormData({...formData, secondary_color: e.target.value})}
                className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">صورة البانوراما (Hero Image URL)</label>
            <input 
              type="text" 
              value={formData.hero_panorama_url}
              onChange={(e) => setFormData({...formData, hero_panorama_url: e.target.value})}
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">شعار الموقع (Logo URL)</label>
            <input 
              type="text" 
              value={formData.logo_url}
              onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">بيانات التواصل</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-bold mb-2">رقم الهاتف</label>
              <input 
                type="text" 
                value={formData.contact_phone}
                onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2">رقم الواتساب</label>
              <input 
                type="text" 
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                value={formData.contact_email}
                onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-2">العنوان (عربي)</label>
              <textarea 
                value={formData.address_ar}
                onChange={(e) => setFormData({...formData, address_ar: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => setFormData(settings)}
            className="px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all"
          >
            إلغاء
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-12 py-4 rounded-xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
