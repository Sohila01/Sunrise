
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { servicesService } from '../../services/servicesService';
import { Service } from '../../types';

const ServiceEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);

  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    name_ar: '',
    name_en: '',
    slug: '',
    short_description_ar: '',
    icon: '🌱',
    is_featured: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      loadService(id);
    }
  }, [id, isEdit]);

  const loadService = async (serviceId: string) => {
    try {
      setLoading(true);
      const service = await servicesService.getService(serviceId);
      if (service) {
        const { id: _, ...rest } = service;
        setFormData(rest);
      }
    } catch (error) {
      console.error('Failed to load service:', error);
      alert('فشل في تحميل الخدمة');
      navigate('/admin/services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit && id) {
        await servicesService.updateService(id, formData);
        alert('تم تحديث الخدمة بنجاح');
      } else {
        await servicesService.createService(formData);
        alert('تم إضافة الخدمة بنجاح');
      }
      navigate('/admin/services');
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('فشل في حفظ الخدمة');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-500 p-12">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-10">{isEdit ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-700 font-bold mb-2">اسم الخدمة (عربي)</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.name_ar}
              onChange={e => setFormData({...formData, name_ar: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">اسم الخدمة (English)</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.name_en}
              onChange={e => setFormData({...formData, name_en: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">الرابط الودي (Slug)</label>
          <input 
            type="text" 
            className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.slug}
            onChange={e => setFormData({...formData, slug: e.target.value})}
            placeholder="eg: greenhouse-systems"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">الوصف القصير</label>
          <textarea 
            className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            rows={3}
            value={formData.short_description_ar}
            onChange={e => setFormData({...formData, short_description_ar: e.target.value})}
            placeholder="وصف قصير للخدمة..."
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">الرمز (Emoji)</label>
          <input 
            type="text" 
            className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.icon}
            onChange={e => setFormData({...formData, icon: e.target.value})}
            placeholder="🌱 أو 💧 إلخ"
            maxLength={2}
          />
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <input 
            type="checkbox" 
            id="is_featured"
            className="w-5 h-5 accent-emerald-600"
            checked={formData.is_featured}
            onChange={e => setFormData({...formData, is_featured: e.target.checked})}
          />
          <label htmlFor="is_featured" className="font-bold text-slate-700">تثبيت في الصفحة الرئيسية</label>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <button type="button" onClick={() => navigate('/admin/services')} className="px-8 py-3 text-slate-500 font-bold" disabled={loading}>إلغاء</button>
          <button type="submit" disabled={loading} className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg transition-all disabled:opacity-50">
            {loading ? 'جاري الحفظ...' : 'حفظ الخدمة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceEditor;
