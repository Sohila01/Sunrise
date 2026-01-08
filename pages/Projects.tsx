
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects: Project[] = [
    { id: '1', title_ar: 'مشروع الصوبات الذكية - المنيا', location: 'المنيا', crop_type: 'طماطم وفلفل ألوان', main_image_url: 'https://cdn.pixabay.com/photo/2016/02/17/23/03/greenhouse-1206397_1280.jpg', is_featured: true, created_at: new Date().toISOString() },
    { id: '2', title_ar: 'مجمع مزارع الفراولة - الإسماعيلية', location: 'الإسماعيلية', crop_type: 'فراولة تصدير', main_image_url: 'https://cdn.pixabay.com/photo/2015/01/08/18/27/fruits-593380_1280.jpg', is_featured: true, created_at: new Date().toISOString() },
    { id: '3', title_ar: 'مزرعة هيدروبونيك - وادي النطرون', location: 'البحيرة', crop_type: 'خضروات ورقية', main_image_url: 'https://cdn.pixabay.com/photo/2016/11/21/14/31/vegetables-1846069_1280.jpg', is_featured: false, created_at: new Date().toISOString() },
    { id: '4', title_ar: 'مشروع الخيار بالأنابيب - الدقهلية', location: 'الدقهلية', crop_type: 'خيار بانوراميك', main_image_url: 'https://cdn.pixabay.com/photo/2014/12/09/14/23/vegetables-563990_1280.jpg', is_featured: false, created_at: new Date().toISOString() },
    { id: '5', title_ar: 'صوبات الأزهار الزينة - كفر الشيخ', location: 'كفر الشيخ', crop_type: 'أزهار زينة', main_image_url: 'https://cdn.pixabay.com/photo/2016/05/20/13/39/rose-1405552_1280.jpg', is_featured: false, created_at: new Date().toISOString() },
    { id: '6', title_ar: 'مزرعة الأعشاب الطبية - الغربية', location: 'الغربية', crop_type: 'نعناع وريحان', main_image_url: 'https://cdn.pixabay.com/photo/2016/02/19/11/29/herbs-1209498_1280.jpg', is_featured: true, created_at: new Date().toISOString() },
  ];

  const categories = [
    { id: 'all', name: 'جميع المشاريع' },
    { id: 'featured', name: 'المشاريع المميزة' },
    { id: 'vegetables', name: 'الخضروات' },
  ];

  const filteredProjects = selectedCategory === 'all' ? projects : selectedCategory === 'featured' ? projects.filter(p => p.is_featured) : projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-50 overflow-hidden pt-32">
        {/* Background decoration */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16,185,129,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-sm mb-6 backdrop-blur-lg"
          >
            ✨ معرض الإنجازات
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight"
          >
            مشاريعنا المتميزة
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-medium"
          >
            نستعرض معكم سجل إنجازاتنا من أكبر المشاريع الزراعية الحديثة في مختلف محافظات الجمهورية
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative -mt-16 z-20 px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-3 rounded-full font-black text-lg transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                    : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-emerald-600'
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -15 }}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-slate-200">
                  <motion.img
                    src={project.main_image_url}
                    alt={project.title_ar}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = 'https://via.placeholder.com/600x500?text=' + project.title_ar;
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Location Badge */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-black shadow-lg"
                  >
                    📍 {project.location}
                  </motion.div>

                  {/* Featured Badge */}
                  {project.is_featured && (
                    <motion.div
                      animate={{ rotate: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 left-4 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2"
                    >
                      ⭐ مشروع مميز
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-snug group-hover:text-emerald-600 transition-colors">
                    {project.title_ar}
                  </h3>

                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                    <span className="text-emerald-600 font-black text-lg">🌾</span>
                    <p className="text-slate-600 font-bold">{project.crop_type}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase mb-2">حالة المشروع</div>
                      <div className="text-emerald-600 font-black">✓ منفذ</div>
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase mb-2">المدة الزمنية</div>
                      <div className="text-slate-900 font-black">90 يوم</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-emerald-600 font-black text-lg flex items-center gap-3 hover:gap-5 transition-all w-full group/btn"
                  >
                    <span>عرض التفاصيل</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ←
                    </motion.span>
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-slate-500 font-medium">لا توجد مشاريع في هذه الفئة حالياً</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 text-slate-900"
          >
            هل أنت مهتم بمشروع مشابه؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            فريقنا الخبير جاهز لمساعدتك في تحويل رؤيتك إلى مشروع ناجح
          </motion.p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
          >
            طلب استشارة مجانية
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
