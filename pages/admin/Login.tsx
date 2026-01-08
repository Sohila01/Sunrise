
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Using the provided password: Hebly@12345@@
    if (password === 'Hebly@12345@@') {
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_login_time', new Date().toISOString());
      onLogin();
      navigate('/admin/dashboard');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">SR</div>
          <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم - صن رايز</h1>
          <p className="text-slate-500">سجل الدخول لإدارة محتوى الموقع</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-700 font-bold mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-slate-100"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
        <div className="mt-10 text-center">
          <a href="#/" className="text-slate-400 hover:text-slate-600">العودة للموقع</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
