
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SiteSettings, Project } from '../types';
import { ICONS } from '../constants';
import { projectsService } from '../services/projectsService';
import { servicesService } from '../services/servicesService';

const Home: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load featured projects once
  useEffect(() => {
    const loadProjects = async () => {
      if (projectsLoaded) return; // تحميل مرة واحدة فقط
      try {
        const projects = await projectsService.getProjects();
        const featured = projects.filter(p => p.is_featured).slice(0, 3);
        setFeaturedProjects(featured);
        setProjectsLoaded(true);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    loadProjects();
  }, [projectsLoaded]);

  // دالة لإعادة تحميل المشاريع يدويًا
  const refreshProjects = async () => {
    try {
      const projects = await projectsService.getProjects();
      const featured = projects.filter(p => p.is_featured).slice(0, 3);
      setFeaturedProjects(featured);
    } catch (error) {
      console.error('Error refreshing projects:', error);
    }
  };

  return (
    <div className="relative">
      {/* 1. CINEMATIC HERO WITH PARALLAX */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.hero_panorama_url || 'https://cdn.pixabay.com/photo/2016/02/17/23/03/greenhouse-1206397_1280.jpg'} 
            alt="greenhouse"
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'https://via.placeholder.com/1920x1080?text=Sunrise+Greenhouses';
            }}
          />
        </div>

        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 z-1"
          animate={{
            x: -mousePosition.x * 0.5,
            y: -mousePosition.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-900/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20" />
        </motion.div>

        {/* Animated light rays */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-sm mb-8 backdrop-blur-lg"
          >
            ✨ رؤية جديدة لمستقبل الزراعة
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-emerald-200"
          >
            {settings.company_name_ar}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {settings.tagline_ar}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link 
              to="/projects" 
              className="group relative px-10 py-4 rounded-2xl font-black text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 group-hover:from-emerald-400 group-hover:to-emerald-500 transition-all duration-300" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              <span className="relative text-white flex items-center gap-2 justify-center">
                مشاهدة الإنجازات
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ➜
                </motion.span>
              </span>
            </Link>

            <a 
              href="#contact" 
              className="group px-10 py-4 rounded-2xl font-black text-lg border-2 border-white/30 backdrop-blur-xl hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 text-white"
            >
              استشارة مجانية
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/50 font-medium text-sm">اسحب للأسفل</span>
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-transparent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative -mt-20 z-20 px-6">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'مشروع زراعي', value: '+١٥٠', sub: 'في كافة المحافظات' },
            { label: 'فدان تحت الإنشاء', value: '+٥٠٠', sub: 'بأحدث التقنيات' },
            { label: 'عميل مستثمر', value: '+٢٠٠', sub: 'شراكة نجاح' },
            { label: 'سنة من الخبرة', value: '+١٢', sub: 'من العطاء والنمو' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl font-black text-emerald-600 mb-3 group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="text-slate-900 font-black text-lg mb-1">{stat.label}</div>
              <div className="text-slate-400 text-sm font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section id="services" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-emerald-600 font-black text-xl mb-4 uppercase tracking-widest">ماذا نقدم؟</h2>
              <h3 className="text-5xl font-black text-slate-900 leading-tight">حلول زراعية ذكية<br/>تغطي كافة احتياجات مشروعك</h3>
            </div>
            <p className="text-slate-500 text-xl max-w-md font-medium leading-relaxed">نحن لا نبني صوبات فحسب، بل نبني أنظمة إنتاجية مستدامة تضمن لك أعلى عائد على الاستثمار.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'إنشاء الصوبات العملاقة', icon: ICONS.Greenhouse, desc: 'تصميم وتنفيذ البيوت المحمية بمواصفات تتحمل الرياح والظروف الجوية الصعبة.' },
              { title: 'أنظمة الري والتحكم الذكي', icon: ICONS.Irrigation, desc: 'أتمتة كاملة لعمليات الري والتسميد لتقليل الفاقد وزيادة الإنتاجية بشكل علمي.' },
              { title: 'الإشراف الزراعي المتخصص', icon: ICONS.Climate, desc: 'متابعة دورية من مهندسين متخصصين لضمان سلامة المحصول من البذرة حتى الحصاد.' },
            ].map((service, i) => (
              <motion.div 
                whileHover={{ y: -15 }}
                key={i} 
                className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-emerald-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-slate-900 leading-snug">{service.title}</h4>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">{service.desc}</p>
                  <button className="text-emerald-600 font-black flex items-center gap-3 hover:gap-5 transition-all">
                    اعرف المزيد <span className="text-xl">←</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section id="projects" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-6">مشاريع في دائرة الضوء</h2>
            <p className="text-slate-500 text-xl font-medium">قصص نجاح سطرناها مع شركائنا في مختلف بقاع مصر</p>
          </div>
          <button 
            onClick={refreshProjects}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg"
          >
            🔄 تحديث
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 px-6 max-w-[1600px] mx-auto overflow-hidden">
            {(featuredProjects.length > 0 ? featuredProjects : [
              { id: '1', title_ar: 'مشروع الصوبات الذكية - المنيا', location: 'المنيا', crop_type: 'صوبات هيدروبونيك', main_image_url: 'https://cdn.pixabay.com/photo/2016/02/17/23/03/greenhouse-1206397_1280.jpg', is_featured: true, created_at: '' },
              { id: '2', title_ar: 'مجمع مزارع الفراولة - الإسماعيلية', location: 'الإسماعيلية', crop_type: 'صوبات شبكية متطورة', main_image_url: 'https://cdn.pixabay.com/photo/2015/01/08/18/27/fruits-593380_1280.jpg', is_featured: true, created_at: '' },
              { id: '3', title_ar: 'إنتاج خضروات التصدير - البحيرة', location: 'البحيرة', crop_type: 'أنظمة ري أوتوماتيكية', main_image_url: 'https://cdn.pixabay.com/photo/2016/11/21/14/31/vegetables-1846069_1280.jpg', is_featured: true, created_at: '' },
            ]).map((p) => (
              <motion.div 
                key={p.id} 
                className="relative h-[600px] flex-1 min-w-[350px] rounded-[3rem] overflow-hidden group shadow-xl"
              >
                <img 
                  src={p.main_image_url} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt="project" 
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://via.placeholder.com/1200x600?text=' + p.title_ar;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-12 flex flex-col justify-end">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-black mb-4 inline-block">{p.crop_type}</span>
                    <h5 className="text-3xl font-black text-white mb-4 leading-tight">{p.title_ar}</h5>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white/70 mb-8 text-lg">تم التنفيذ خلال ٩٠ يوماً بأعلى المواصفات العالمية.</p>
                      <Link to="/projects" className="text-emerald-400 font-bold flex items-center gap-2 underline underline-offset-8">تفاصيل المشروع الكاملة</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100 relative">
            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-emerald-600 flex flex-col items-center justify-center text-white text-center p-12"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                  </motion.div>
                  <h2 className="text-5xl font-black mb-4">تم إرسال طلبك بنجاح!</h2>
                  <p className="text-xl font-medium opacity-80">سيقوم فريقنا بالتواصل معك خلال ٢٤ ساعة عمل.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="lg:w-2/5 bg-emerald-600 p-16 md:p-24 text-white">
              <h2 className="text-5xl font-black mb-8 leading-tight">دعنا نتحدث عن مشروعك القادم</h2>
              <p className="text-white/80 text-xl mb-12 font-medium leading-relaxed">فريقنا جاهز لتقديم دراسة مبدئية لمشروعك والإجابة على كافة استفساراتك التقنية والمالية.</p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    {ICONS.Contact}
                  </div>
                  <div>
                    <div className="text-white/60 text-sm font-bold uppercase">اتصل بنا مباشرة</div>
                    <div className="text-xl font-black tracking-wide">{settings.contact_phone || '+20 123 456 7890'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-1.114 4.07 4.162-1.091c.905.492 1.912.747 2.924.747h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.38 8.019c-.147.414-.712.766-1.144.814-.358.041-.821.066-1.312-.091-.314-.1-.709-.234-1.22-.442-2.181-.888-3.593-3.087-3.702-3.235-.11-.147-.893-1.185-.893-2.261 0-1.076.564-1.606.766-1.826.202-.219.441-.275.588-.275.147 0 .294.001.423.007.133.006.312-.05.489.376.183.442.625 1.526.68 1.636.055.11.092.239.018.386s-.11.239-.22.368c-.11.129-.231.288-.33.404-.11.129-.225.269-.098.489.127.22.565.933 1.214 1.511.836.745 1.539.976 1.759 1.086.22.11.349.092.477-.055.129-.147.551-.643.698-.863.147-.22.294-.184.496-.11.202.073 1.287.607 1.507.717.22.11.367.165.423.257.056.092.056.533-.091.947z"></path></svg>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm font-bold uppercase">واتساب متاح ٢٤/٧</div>
                    <div className="text-xl font-black tracking-wide">{settings.whatsapp_number || '+20 123 456 7890'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/5 p-16 md:p-24 bg-white">
              <form onSubmit={handleSubmit} className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-slate-400 font-black text-xs uppercase mb-3 tracking-widest">الاسم الكامل</label>
                    <input required type="text" className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" placeholder="أحمد محمد" />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-black text-xs uppercase mb-3 tracking-widest">رقم الجوال</label>
                    <input required type="tel" className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" placeholder="012xxxxxxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-black text-xs uppercase mb-3 tracking-widest">البريد الإلكتروني</label>
                  <input type="email" className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" placeholder="name@company.com" />
                </div>
                <div>
                  <label className="block text-slate-400 font-black text-xs uppercase mb-3 tracking-widest">نوع الخدمة المطلوبة</label>
                  <select className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold appearance-none">
                    <option>إنشاء صوبة زراعية</option>
                    <option>تطوير نظام ري</option>
                    <option>إشراف زراعي كامل</option>
                    <option>طلب توريد مستلزمات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-black text-xs uppercase mb-3 tracking-widest">رسالتك / تفاصيل المشروع</label>
                  <textarea rows={5} className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" placeholder="اكتب لنا أي تفاصيل إضافية هنا..."></textarea>
                </div>
                <button type="submit" className="bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200">
                  إرسال الطلب الآن
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
