
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsService } from '../../services/projectsService';
import { Project } from '../../types';

const AdminProjects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        await projectsService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Failed to delete project:', error);
        alert('فشل في حذف المشروع');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black">معرض المشاريع</h1>
          <p className="text-slate-500 mt-1">إدارة المشاريع المنفذة وصور الموقع</p>
        </div>
        <button 
          onClick={() => navigate('/admin/projects/new')}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl flex items-center gap-2"
        >
          <span className="text-2xl">+</span> إضافة مشروع جديد
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-[2rem] text-center text-slate-500">
          جاري تحميل البيانات...
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] text-center">
          <p className="text-slate-500 font-bold mb-4">لا توجد مشاريع حالياً</p>
          <button 
            onClick={() => navigate('/admin/projects/new')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all"
          >
            إضافة أول مشروع
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 font-bold text-slate-500">المشروع</th>
                <th className="p-6 font-bold text-slate-500">الموقع</th>
                <th className="p-6 font-bold text-slate-500">نوع المحصول</th>
                <th className="p-6 font-bold text-slate-500">التميز</th>
                <th className="p-6 font-bold text-slate-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {p.main_image_url && (
                        <img src={p.main_image_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      )}
                      <span className="font-black text-slate-900">{p.title_ar}</span>
                    </div>
                  </td>
                  <td className="p-6 text-slate-600 font-bold">{p.location}</td>
                  <td className="p-6 text-slate-600 font-bold">{p.crop_type}</td>
                  <td className="p-6">
                    {p.is_featured ? (
                      <span className="text-amber-500 font-black text-sm flex items-center gap-1">
                        <span className="text-lg">★</span> مميز
                      </span>
                    ) : (
                      <span className="text-slate-300 text-sm font-bold">عادي</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                        className="text-emerald-600 hover:text-emerald-800 font-bold"
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="text-red-400 hover:text-red-600 font-bold"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
