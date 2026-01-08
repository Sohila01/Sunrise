
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectsService } from '../../services/projectsService';
import { Project } from '../../types';

const ProjectEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title_ar: '',
    location: '',
    crop_type: '',
    main_image_url: '',
    is_featured: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      loadProject(id);
    }
  }, [id, isEdit]);

  const loadProject = async (projectId: string) => {
    try {
      setLoading(true);
      const project = await projectsService.getProject(projectId);
      if (project) {
        const { id: _, ...rest } = project;
        setFormData(rest);
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('فشل في تحميل المشروع');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit && id) {
        await projectsService.updateProject(id, formData);
        alert('تم تحديث المشروع بنجاح');
      } else {
        await projectsService.createProject(formData);
        alert('تم إضافة المشروع بنجاح');
      }
      navigate('/admin/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('فشل في حفظ المشروع');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div className="text-center text-slate-500 p-12">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black">{isEdit ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد للمعرض'}</h1>
        <button onClick={() => navigate('/admin/projects')} className="text-slate-500 font-bold hover:text-slate-800 transition-colors">
          ← العودة للقائمة
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 grid md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-emerald-600 mb-4 border-b pb-2">المعلومات الأساسية</h3>
          </div>
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-bold mb-2">عنوان المشروع (عربي)</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.title_ar}
              onChange={e => setFormData({...formData, title_ar: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">الموقع (المحافظة)</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">نوع المحصول</label>
            <input 
              type="text" 
              className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.crop_type}
              onChange={e => setFormData({...formData, crop_type: e.target.value})}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-emerald-600 mb-6 border-b pb-2">الوسائط والإعدادات</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-slate-700 font-bold mb-2">رابط الصورة الرئيسية</label>
              <input 
                type="text" 
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                placeholder="https://..."
                value={formData.main_image_url}
                onChange={e => setFormData({...formData, main_image_url: e.target.value})}
              />
              <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200">
                {formData.main_image_url ? (
                  <img src={formData.main_image_url} className="w-full h-full object-cover" alt="Preview" onError={() => {}} />
                ) : (
                  <span className="text-slate-400 font-bold">معاينة الصورة</span>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                <input 
                  type="checkbox" 
                  id="feat"
                  className="w-6 h-6 accent-emerald-600"
                  checked={formData.is_featured}
                  onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                />
                <label htmlFor="feat" className="font-black text-emerald-900">مشروع مميز (يظهر في المقدمة)</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-8 py-3 text-slate-500 font-bold"
            disabled={loading}
          >
            إلغاء
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-emerald-600 text-white px-16 py-4 rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-2xl transition-all disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ المشروع'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEditor;
