
import React, { useState, useEffect } from 'react';
import { faqService } from '../../services/faqService';
import { FAQ } from '../../types';

const AdminFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newFaq, setNewFaq] = useState({ 
    question_ar: '', 
    answer_ar: '',
    question_en: '',
    answer_en: '',
    category: 'عام',
    order: 0
  });

  useEffect(() => {
    loadFAQ();
  }, []);

  const loadFAQ = async () => {
    try {
      setLoading(true);
      const data = await faqService.getFAQ();
      setFaqs(data);
    } catch (error) {
      console.error('Failed to load FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (newFaq.question_ar && newFaq.answer_ar) {
      try {
        const faq = await faqService.createFAQ({
          question_ar: newFaq.question_ar,
          answer_ar: newFaq.answer_ar,
          question_en: newFaq.question_en || newFaq.question_ar,
          answer_en: newFaq.answer_en || newFaq.answer_ar,
          category: newFaq.category,
          order: newFaq.order
        });
        setFaqs([...faqs, faq]);
        setNewFaq({ question_ar: '', answer_ar: '', question_en: '', answer_en: '', category: 'عام', order: 0 });
        setIsAdding(false);
      } catch (error) {
        console.error('Failed to add FAQ:', error);
        alert('فشل في إضافة السؤال');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      try {
        await faqService.deleteFAQ(id);
        setFaqs(faqs.filter(f => f.id !== id));
      } catch (error) {
        console.error('Failed to delete FAQ:', error);
        alert('فشل في حذف السؤال');
      }
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">الأسئلة الشائعة</h1>
          <p className="text-slate-500 font-bold">إدارة الأسئلة التي تظهر للعملاء في صفحة المساعدة</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg"
        >
          + إضافة سؤال
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2rem] border-2 border-emerald-500 shadow-xl mb-8 space-y-4">
          <input 
            className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
            placeholder="السؤال (عربي)..."
            value={newFaq.question_ar}
            onChange={e => setNewFaq({...newFaq, question_ar: e.target.value})}
          />
          <textarea 
            className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            placeholder="الإجابة (عربي)..."
            rows={3}
            value={newFaq.answer_ar}
            onChange={e => setNewFaq({...newFaq, answer_ar: e.target.value})}
          />
          <select 
            className="w-full p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500"
            value={newFaq.category}
            onChange={e => setNewFaq({...newFaq, category: e.target.value})}
          >
            <option>عام</option>
            <option>التنفيذ</option>
            <option>الضمان</option>
            <option>الأسعار</option>
            <option>التوصيل</option>
          </select>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsAdding(false)} className="text-slate-400 font-bold px-4">إلغاء</button>
            <button onClick={handleAdd} className="bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold">حفظ السؤال</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white p-12 rounded-[2rem] text-center text-slate-500">
          جاري تحميل البيانات...
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] text-center">
          <p className="text-slate-500 font-bold mb-4">لا توجد أسئلة حالياً</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 flex-1">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-black flex-shrink-0">Q</span>
                  <h3 className="font-black text-slate-900 text-lg">{faq.question_ar}</h3>
                </div>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="text-slate-400 hover:text-red-500 font-bold ml-4 flex-shrink-0"
                >
                  حذف
                </button>
              </div>
              <div className="pr-12">
                <p className="text-slate-600 font-medium leading-relaxed">{faq.answer_ar}</p>
                <span className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                  {faq.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFAQ;
