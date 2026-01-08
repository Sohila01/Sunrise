
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsService } from '../../services/productsService';
import { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await productsService.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('فشل في حذف المنتج');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black">كتالوج المنتجات</h1>
          <p className="text-slate-500 font-bold">إدارة قائمة التوريدات والمعدات</p>
        </div>
        <button 
          onClick={() => navigate('/admin/products/new')}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 shadow-xl transition-all"
        >
          + إضافة منتج
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-[2rem] text-center text-slate-500">
          جاري تحميل البيانات...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] text-center">
          <p className="text-slate-500 font-bold mb-4">لا توجد منتجات حالياً</p>
          <button 
            onClick={() => navigate('/admin/products/new')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all"
          >
            إضافة أول منتج
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group hover:border-emerald-500 transition-all">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {p.image_url ? (
                  <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-3xl">📦</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-500">{p.category}</div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-slate-900 mb-2">{p.name_ar}</h3>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-emerald-600 font-bold text-sm">{p.price > 0 ? `${p.price} ج.م` : 'تواصل للسعر'}</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {p.is_active ? 'نشط' : 'مخفي'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/admin/products/edit/${p.id}`)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-all">تعديل</button>
                  <button onClick={() => handleDelete(p.id)} className="px-4 bg-slate-100 py-3 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all text-slate-400">حذف</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
