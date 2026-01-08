# 🌱 Sunrise Greenhouses CMS - نظام صن رايز الزراعي

## تم الإنجاز ✅

### البنية الأساسية
- ✅ إعداد مشروع Vite مع React و TypeScript
- ✅ تثبيت Tailwind CSS مع الخط العربي Cairo
- ✅ إعداد تسجيل الدخول برقم سري
- ✅ نظام التوجيه (Routing) الكامل
- ✅ تصميم المسؤول (Admin Panel) مستجيب

### التكامل مع Supabase
- ✅ إعداد عميل Supabase
- ✅ التحقق من بيانات الاعتماد:
  - URL: `https://zyexceyicpupdypssine.supabase.co`
  - مفتاح عام: `sb_publishable_lhWJJWSLi3sF5nLtrVIuMw_X8E7KtzZ`
  - كلمة المرور: `Hebly@12345@@`

### خدمات الأساس الفعلية
- ✅ خدمة الخدمات (Services)
- ✅ خدمة المشاريع (Projects)
- ✅ خدمة المنتجات (Products)
- ✅ خدمة الطلبات (Leads)
- ✅ خدمة الأسئلة الشائعة (FAQ)
- ✅ خدمة الوسائط (Media)
- ✅ خدمة الإعدادات (Settings)

### صفحات المسؤول المكتملة
- ✅ لوحة التحكم (Dashboard)
- ✅ إدارة الخدمات (Services Management)
- ✅ إدارة المشاريع (Projects Management)
- ✅ إدارة المنتجات (Products Management)
- ✅ إدارة الطلبات (Leads Management)
- ✅ الأسئلة الشائعة (FAQ Management)
- ✅ مكتبة الوسائط (Media Library)
- ✅ إعدادات الموقع (Settings)

---

## كيفية الاستخدام 🚀

### تشغيل التطبيق
```bash
# تثبيت المتطلبات
npm install

# تشغيل خادم التطوير
npm run dev
```

الموقع سيكون متاحاً على: `http://localhost:3002/`

### الدخول إلى لوحة التحكم
1. انتقل إلى: `http://localhost:3002/#/admin/login`
2. أدخل كلمة المرور: `Hebly@12345@@`
3. ستدخل إلى لوحة التحكم الرئيسية

---

## جداول Supabase المطلوبة 📊

قم بإنشاء الجداول التالية في Supabase:

### جدول site_settings (إعدادات الموقع)
```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY,
  primary_color TEXT,
  secondary_color TEXT,
  font_family TEXT,
  logo_url TEXT,
  company_name_ar TEXT,
  company_name_en TEXT,
  tagline_ar TEXT,
  tagline_en TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  whatsapp_number TEXT,
  address_ar TEXT,
  hero_panorama_url TEXT,
  created_at TIMESTAMP
);
```

### جدول services (الخدمات)
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE,
  name_ar TEXT,
  name_en TEXT,
  short_description_ar TEXT,
  icon TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP
);
```

### جدول projects (المشاريع)
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  title_ar TEXT,
  location TEXT,
  crop_type TEXT,
  main_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP
);
```

### جدول products (المنتجات)
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name_ar TEXT,
  name_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  price DECIMAL,
  image_url TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
);
```

### جدول leads (الطلبات)
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP
);
```

### جدول faq (الأسئلة الشائعة)
```sql
CREATE TABLE faq (
  id UUID PRIMARY KEY,
  question_ar TEXT,
  question_en TEXT,
  answer_ar TEXT,
  answer_en TEXT,
  category TEXT,
  "order" INTEGER,
  created_at TIMESTAMP
);
```

### جدول media (الوسائط)
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY,
  file_url TEXT,
  file_name TEXT,
  file_type TEXT,
  size INTEGER,
  created_at TIMESTAMP
);
```

---

## المميزات الرئيسية 🎯

### واجهة المستخدم
- تصميم حديث وسلس باستخدام Tailwind CSS
- دعم كامل للغة العربية
- واجهة مستخدم ديناميكية مع Framer Motion
- قائمة جانبية قابلة للطي
- أيقونات من Lucide React

### إدارة البيانات
- إنشاء وتعديل وحذف جميع المحتويات
- تحميل وإدارة الوسائط
- نسخ روابط الملفات
- عرض معاينات الصور

### الأمان
- نظام تسجيل دخول محمي
- التحقق من جلسات المستخدم
- مسارات محمية للمسؤولين

---

## الملفات الهامة 📁

```
src/
├── components/        # المكونات المشتركة
├── pages/            # صفحات التطبيق
│   ├── Home.tsx      # الصفحة الرئيسية
│   ├── Projects.tsx  # صفحة المشاريع
│   └── admin/        # صفحات المسؤول
├── services/         # خدمات Supabase
├── lib/             # مكتبات مساعدة
├── types.ts         # أنواع TypeScript
├── constants.tsx    # الثوابت والأيقونات
└── App.tsx          # التطبيق الرئيسي
```

---

## النقاط المتبقية (اختيارية) 📝

1. **صفحات التفاصيل**: إكمال صفحات تفاصيل الطلبات والمشاريع
2. **الصفحات العامة**: إكمال صفحة المشاريع والخدمات الجديدة
3. **تحميل الملفات**: تطبيق نظام رفع الملفات الكامل
4. **البحث والتصفية**: إضافة خصائص البحث المتقدمة
5. **النسخ الاحتياطية**: إعداد النسخ الاحتياطية التلقائية

---

## ملاحظات تطويرية 💡

### أنواع البيانات (Types)
يمكنك العثور على جميع أنواع البيانات في ملف [types.ts](types.ts)

### استخدام الخدمات
```typescript
import { servicesService } from './services/servicesService';

// الحصول على جميع الخدمات
const services = await servicesService.getAllServices();

// الحصول على خدمة واحدة
const service = await servicesService.getService(id);

// إنشاء خدمة جديدة
const newService = await servicesService.createService(data);

// تحديث خدمة
const updated = await servicesService.updateService(id, data);

// حذف خدمة
await servicesService.deleteService(id);
```

---

## الدعم والمساعدة 🆘

تأكد من:
1. ✅ تثبيت جميع المتطلبات `npm install`
2. ✅ إنشاء جميع جداول Supabase
3. ✅ استخدام بيانات الاعتماد الصحيحة
4. ✅ تشغيل السيرفر على المنفذ الصحيح

---

**آخر تحديث**: يناير 2026
**الإصدار**: v1.0.0
**الحالة**: ✅ جاهز للاستخدام
