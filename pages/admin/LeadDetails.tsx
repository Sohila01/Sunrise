
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LeadDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock lead data
  const [lead, setLead] = useState({
    name: 'أحمد محمود',
    phone: '01012345678',
    email: 'ahmed@example.com',
    service: 'إنشاء صوبات زراعية',
    message: 'أريد إنشاء مشروع صوبات على مساحة ٥ أفدان في مدينة السادات، أرجو التواصل لتحديد موعد معاينة.',
    status: 'new',
    created_at: '2023-10-25 10:30 AM',
    notes: ''
  });

  const handleUpdateStatus = (newStatus: string) => {
    setLead({...lead, status: newStatus});
    alert('تم تحديث حالة الطلب');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">تفاصيل طلب التواصل</h1>
        <button onClick={() => navigate('/admin/leads')} className="text-slate-500 font-bold">← العودة</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">محتوى الرسالة</h3>
            <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-2xl border border-slate-100">
              "{lead.message}"
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">ملاحظات الإدارة</h3>
            <textarea 
              rows={4}
              className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none mb-4"
              placeholder="أضف ملاحظاتك هنا (مثل: تم الاتصال، العميل مهتم، سيتم المعاينة الخميس...)"
              value={lead.notes}
              onChange={e => setLead({...lead, notes: e.target.value})}
            />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm">حفظ الملاحظات</button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">بيانات العميل</h3>
            <div className="space-y-4">
              <div>
                <span className="text-slate-400 text-xs font-bold block">الاسم</span>
                <span className="text-slate-900 font-black">{lead.name}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold block">الهاتف</span>
                <span className="text-slate-900 font-black dir-ltr inline-block">{lead.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold block">البريد</span>
                <span className="text-slate-900 font-bold">{lead.email}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold block">تاريخ الطلب</span>
                <span className="text-slate-500 text-sm font-bold">{lead.created_at}</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100">
            <h3 className="text-lg font-bold mb-6">تحديث حالة الطلب</h3>
            <div className="grid gap-3">
              <button onClick={() => handleUpdateStatus('contacted')} className="bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all">جاري التواصل</button>
              <button onClick={() => handleUpdateStatus('qualified')} className="bg-white text-emerald-700 py-3 rounded-xl font-bold transition-all">عميل مؤهل</button>
              <button onClick={() => handleUpdateStatus('rejected')} className="bg-red-500/20 hover:bg-red-500/40 py-3 rounded-xl font-bold transition-all">غير مهتم</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
