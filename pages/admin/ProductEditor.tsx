
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name_ar: '',
    category: 'هياكل معدنية',
    description_ar: '',
    price_range: '',
    stock_status: 'متوفر',
    image_url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ المنتج بنجاح');
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">{isEdit ? 'تعديل منتج' : 'إضافة منتج جديد للكتالوج'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-bold mb-2">اسم المنتج</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
              value={formData.name_ar}
              onChange={e => setFormData({...formData, name_ar: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">الفئة</label>
            <select 
              className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>هياكل معدنية</option>
              <option>أنظمة ري</option>
              <option>أغطية وبلاستيك</option>
              <option>أسمدة ومبيدات</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">حالة التوفر</label>
            <select 
              className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
              value={formData.stock_status}
              onChange={e => setFormData({...formData, stock_status: e.target.value})}
            >
              <option>متوفر</option>
              <option>غير متوفر حالياً</option>
              <option>طلب مسبق</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">وصف المنتج ومواصفاته</label>
          <textarea 
            rows={4}
            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
            value={formData.description_ar}
            onChange={e => setFormData({...formData, description_ar: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-8 py-3 text-slate-400 font-bold">إلغاء</button>
          <button type="submit" className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-emerald-700 shadow-xl transition-all">
            حفظ المنتج
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditor;
