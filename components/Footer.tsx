
import React from 'react';
import { SiteSettings } from '../types';

const Footer: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="text-white text-2xl font-bold mb-6">{settings.company_name_ar}</div>
          <p className="max-w-md leading-relaxed">
            الشركة الرائدة في حلول الزراعة الحديثة وتكنولوجيا الصوبات الزراعية في الشرق الأوسط. نسعى دائماً للتميز والابتكار في كل مشروع نقوم بتنفيذه.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">روابط سريعة</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">من نحن</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">مشاريعنا</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">الخدمات</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">معلومات التواصل</h4>
          <ul className="space-y-4">
            <li>{settings.address_ar || 'القاهرة، جمهورية مصر العربية'}</li>
            <li>{settings.contact_phone || '+20 123 456 7890'}</li>
            <li>{settings.contact_email || 'info@sunrise-greenhouses.com'}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center">
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة صن رايز للصوبات الزراعية</p>
      </div>
    </footer>
  );
};

export default Footer;
