
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadsService } from '../../services/leadsService';
import { Lead } from '../../types';

const AdminLeads: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await leadsService.getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">طلبات التواصل والعملاء</h1>
          <p className="text-slate-500 font-bold">متابعة كافة الاستفسارات الواردة من الموقع</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="bg-white border-2 border-slate-200 px-4 py-2 rounded-xl font-bold outline-none focus:ring-2 focus:ring-emerald-500"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">الكل</option>
            <option value="new">جديد</option>
            <option value="contacted">جاري التواصل</option>
            <option value="qualified">مؤهل</option>
          </select>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            تصدير CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-slate-500">جاري تحميل البيانات...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-slate-500 font-bold">لا توجد طلبات حالياً</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest">العميل</th>
                <th className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest">الاتصال</th>
                <th className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest">البريد</th>
                <th className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest">التاريخ</th>
                <th className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest">الحالة</th>
                <th className="p-6 font-bold text-slate-500 uppercase text-xs tracking-widest text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="font-black text-slate-900">{lead.name}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm text-slate-600 font-bold dir-ltr inline-block">{lead.phone}</div>
                  </td>
                  <td className="p-6">
                    <span className="text-slate-700 font-medium text-sm">{lead.email}</span>
                  </td>
                  <td className="p-6 text-slate-500 text-sm font-medium">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                      lead.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 
                      lead.status === 'qualified' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {lead.status === 'new' ? 'جديد' : lead.status === 'contacted' ? 'جاري التواصل' : lead.status === 'qualified' ? 'مؤهل' : 'مرفوض'}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <button 
                      onClick={() => navigate(`/admin/leads/${lead.id}`)}
                      className="bg-slate-50 text-slate-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      عرض التفاصيل
                    </button>
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

export default AdminLeads;
