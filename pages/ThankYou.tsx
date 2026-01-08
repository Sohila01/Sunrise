import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-slate-50 pt-20 pb-10 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Success Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/50"
        >
          <span className="text-5xl">✓</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-black mb-6 text-slate-900"
        >
          شكراً لتواصلك معنا!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-slate-600 mb-12 leading-relaxed font-medium"
        >
          تم استقبال طلبك بنجاح ✨
          <br />
          سيقوم فريقنا بالتواصل معك قريباً لمناقشة احتياجاتك وتقديم أفضل الحلول الزراعية
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-12 bg-white p-10 rounded-2xl shadow-lg border border-emerald-100"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">⚡</div>
            <p className="text-slate-600 font-bold">رد سريع</p>
            <p className="text-sm text-slate-500 mt-1">خلال 24 ساعة</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">💬</div>
            <p className="text-slate-600 font-bold">تواصل مباشر</p>
            <p className="text-sm text-slate-500 mt-1">عبر الهاتف أو واتس</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">🎯</div>
            <p className="text-slate-600 font-bold">حل مخصص</p>
            <p className="text-sm text-slate-500 mt-1">لاحتياجاتك الدقيقة</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            to="/"
            className="group relative px-10 py-4 rounded-2xl font-black text-lg overflow-hidden text-white"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 group-hover:from-emerald-400 group-hover:to-emerald-500 transition-all duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              العودة للرئيسية
              <span className="group-hover:translate-x-1 transition-transform">←</span>
            </span>
          </Link>

          <a
            href="https://wa.me/+201001234567?text=مرحباً%20أنا%20أتابع%20على%20طلبي"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-2xl font-black text-lg border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
          >
            💬 تواصل عبر واتس
          </a>
        </motion.div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 p-8 bg-emerald-50 rounded-xl border border-emerald-200"
        >
          <p className="text-slate-600 text-center">
            <strong>هل لديك استفسار؟</strong>
            <br />
            تواصل معنا مباشرة: <strong className="text-emerald-600">+20 100 123 4567</strong>
            <br />
            أو <strong className="text-emerald-600">info@sunrise-greenhouses.com</strong>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
