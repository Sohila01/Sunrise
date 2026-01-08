
import React, { useState, useEffect } from 'react';
import { mediaService } from '../../services/mediaService';
import { MediaItem } from '../../types';

const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getMedia();
      setMedia(data);
    } catch (error) {
      console.error('Failed to load media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      try {
        await mediaService.deleteMedia(id, filePath);
        setMedia(media.filter(m => m.id !== id));
      } catch (error) {
        console.error('Failed to delete media:', error);
        alert('فشل في حذف الملف');
      }
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black">مكتبة الوسائط</h1>
        <div className="flex gap-4">
          <input type="file" id="media-upload" className="hidden" />
          <label htmlFor="media-upload" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg cursor-pointer">
            رفع ملفات جديدة
          </label>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-[2rem] text-center text-slate-500">
          جاري تحميل البيانات...
        </div>
      ) : media.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] text-center">
          <p className="text-slate-500 font-bold">لا توجد ملفات حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <div key={item.id} className="group">
              {isImageUrl(item.file_url) ? (
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-all bg-slate-100 flex items-center justify-center">
                  <img src={item.file_url} className="w-full h-full object-cover" alt={item.file_name} />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => copyToClipboard(item.file_url, item.id)}
                      className="bg-white text-slate-900 p-2 rounded-lg text-xs font-bold hover:bg-emerald-50"
                    >
                      {copiedId === item.id ? '✓ نسخ' : 'نسخ الرابط'}
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.file_name)}
                      className="bg-red-500 text-white p-2 rounded-lg text-xs font-bold hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center flex-col gap-2 p-4">
                  <div className="text-4xl">📄</div>
                  <p className="text-xs text-center text-slate-600 truncate">{item.file_name}</p>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => copyToClipboard(item.file_url, item.id)}
                      className="bg-white text-slate-900 p-2 rounded-lg text-xs font-bold"
                    >
                      {copiedId === item.id ? '✓ نسخ' : 'نسخ الرابط'}
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.file_name)}
                      className="bg-red-500 text-white p-2 rounded-lg text-xs font-bold"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
