
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'إجمالي الطلبات', value: '٤٨', color: 'bg-emerald-500', trend: '+١٢٪' },
    { label: 'المشاريع المنفذة', value: '١٥٤', color: 'bg-blue-500', trend: '+٥' },
    { label: 'الخدمات النشطة', value: '١٢', color: 'bg-amber-500', trend: 'ثابت' },
    { label: 'زيارات الموقع', value: '١.٢ ألف', color: 'bg-purple-500', trend: '+٢٤٪' },
  ];

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">نظرة عامة</h1>
          <p className="text-slate-500 font-bold mt-1">مرحباً بك مجدداً في نظام إدارة صن رايز</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/admin/leads')} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">مراجعة الطلبات</button>
          <button onClick={() => navigate('/admin/projects/new')} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">+ مشروع جديد</button>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <span className="text-emerald-600 font-black text-sm bg-emerald-50 px-3 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800">أحدث طلبات التواصل</h3>
              <button onClick={() => navigate('/admin/leads')} className="text-emerald-600 font-bold hover:underline">عرض جميع الطلبات</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    <th className="p-6">العميل</th>
                    <th className="p-6">الخدمة</th>
                    <th className="p-6">التاريخ</th>
                    <th className="p-6">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'مؤسسة زاد الزراعية', service: 'إنشاء صوبات', date: 'منذ ١٠ دقائق', status: 'جديد' },
                    { name: 'د. خالد سليم', service: 'نظام ري ذكي', date: 'منذ ساعتين', status: 'قيد التواصل' },
                    { name: 'شركة النماء', service: 'إشراف كامل', date: 'منذ ٥ ساعات', status: 'جديد' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-6">
                        <div className="font-bold text-slate-900">{row.name}</div>
                      </td>
                      <td className="p-6 text-slate-500 font-medium">{row.service}</td>
                      <td className="p-6 text-slate-400 text-sm">{row.date}</td>
                      <td className="p-6">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${row.status === 'جديد' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
            <h3 className="text-xl font-black mb-8 relative z-10 text-emerald-400">نصيحة تقنية</h3>
            <p className="text-slate-300 leading-relaxed mb-10 text-lg">
              "احرص دائماً على رفع صور عالية الجودة لمشاريعك، فالصور هي العامل الأول في إقناع المستثمر الزراعي بكفاءة عملك."
            </p>
            <button onClick={() => navigate('/admin/media')} className="w-full bg-emerald-600 py-4 rounded-2xl font-black hover:bg-emerald-500 transition-all">زيارة مكتبة الوسائط</button>
          </div>
          
          <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-800 mb-6">نشاط النظام</h3>
             <div className="space-y-6">
               {[
                 { user: 'مدير النظام', action: 'حدث إعدادات الموقع', time: 'منذ ساعة' },
                 { user: 'محرر المحتوى', action: 'أضاف مشروع "الفيوم"', time: 'منذ ٣ ساعات' },
                 { user: 'مدير النظام', action: 'رفع لوجو جديد', time: 'أمس' },
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 items-start">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                   <div>
                     <p className="text-slate-700 font-bold text-sm">{log.user} <span className="font-medium text-slate-400">{log.action}</span></p>
                     <p className="text-[10px] text-slate-300 font-bold">{log.time}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
