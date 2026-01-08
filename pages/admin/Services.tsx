
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesService } from '../../services/servicesService';
import { Service } from '../../types';

const AdminServices: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getAllServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      try {
        await servicesService.deleteService(id);
        setServices(services.filter(s => s.id !== id));
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('فشل في حذف الخدمة');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black">إدارة الخدمات</h1>
          <p className="text-slate-500 mt-1">إضافة وتعديل الخدمات المعروضة على الموقع</p>
        </div>
        <button 
          onClick={() => navigate('/admin/services/new')}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> إضافة خدمة جديدة
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-[2rem] text-center text-slate-500">
          جاري تحميل البيانات...
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] text-center">
          <p className="text-slate-500 font-bold mb-4">لا توجد خدمات حالياً</p>
          <button 
            onClick={() => navigate('/admin/services/new')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all"
          >
            إضافة أول خدمة
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-emerald-200 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 font-bold border border-slate-100 text-2xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{service.name_ar}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{service.slug}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`px-4 py-1 rounded-full text-xs font-black ${
                  service.is_featured ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {service.is_featured ? 'مميزة' : 'غير مميزة'}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                    className="px-4 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-lg text-sm font-bold transition-all"
                  >
                    تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="px-4 py-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg text-sm font-bold transition-all"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
