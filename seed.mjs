import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const SUPABASE_URL = 'https://zyexceyicpupdypssine.supabase.co';
const SUPABASE_KEY = 'sb_publishable_lhWJJWSLi3sF5nLtrVIuMw_X8E7KtzZ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seedDatabase() {
  try {
    console.log('🌱 بدء إضافة البيانات التجريبية...');
    console.log('');

    // 1. إضافة إعدادات الموقع
    console.log('📝 إضافة إعدادات الموقع...');
    await supabase.from('site_settings').insert({
      id: randomUUID(),
      primary_color: '#10b981',
      secondary_color: '#059669',
      font_family: 'Cairo',
      logo_url: 'https://via.placeholder.com/200x80?text=Sunrise+Greenhouses',
      company_name_ar: 'صن رايز للدفايات',
      company_name_en: 'Sunrise Greenhouses',
      tagline_ar: 'حلول زراعية حديثة للمستقبل',
      tagline_en: 'Modern Agricultural Solutions for the Future',
      contact_phone: '+20 100 123 4567',
      contact_email: 'info@sunrise-greenhouses.com',
      whatsapp_number: '+20 100 123 4567',
      address_ar: 'القاهرة - مصر',
      hero_panorama_url: 'https://via.placeholder.com/1920x600?text=Sunrise+Greenhouses',
      created_at: new Date().toISOString(),
    });

    // 2. إضافة الخدمات
    console.log('🔧 إضافة الخدمات...');
    const services = [
      {
        id: randomUUID(),
        slug: 'irrigation-systems',
        name_ar: 'أنظمة الري الحديثة',
        name_en: 'Modern Irrigation Systems',
        short_description_ar: 'أنظمة ري متقدمة موفرة للمياه والطاقة',
        icon: '💧',
        is_featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: 'greenhouse-design',
        name_ar: 'تصميم وإنشاء الدفايات',
        name_en: 'Greenhouse Design & Construction',
        short_description_ar: 'تصميم وبناء دفايات بأعلى المواصفات',
        icon: '🏠',
        is_featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: 'climate-control',
        name_ar: 'التحكم بالمناخ',
        name_en: 'Climate Control Systems',
        short_description_ar: 'أنظمة تحكم بدرجة الحرارة والرطوبة',
        icon: '❄️',
        is_featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: 'soil-management',
        name_ar: 'إدارة التربة',
        name_en: 'Soil Management',
        short_description_ar: 'استشارات متخصصة في تحسين التربة',
        icon: '🌱',
        is_featured: false,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: 'pest-control',
        name_ar: 'مكافحة الآفات',
        name_en: 'Pest Control Solutions',
        short_description_ar: 'حلول آمنة وفعالة لمكافحة الآفات',
        icon: '🐛',
        is_featured: false,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: 'fertilizers',
        name_ar: 'الأسمدة المتخصصة',
        name_en: 'Specialized Fertilizers',
        short_description_ar: 'أسمدة عضوية وكيميائية متوازنة',
        icon: '🧪',
        is_featured: false,
        created_at: new Date().toISOString(),
      },
    ];
    await supabase.from('services').insert(services);

    // 3. إضافة المشاريع
    console.log('🏆 إضافة المشاريع...');
    const projects = [
      {
        id: randomUUID(),
        title_ar: 'مشروع دفاية الطماطم - المنوفية',
        location: 'المنوفية',
        crop_type: 'طماطم',
        main_image_url: 'https://via.placeholder.com/400x300?text=Tomato+Greenhouse',
        is_featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title_ar: 'مشروع دفاية الخيار - الجيزة',
        location: 'الجيزة',
        crop_type: 'خيار',
        main_image_url: 'https://via.placeholder.com/400x300?text=Cucumber+Greenhouse',
        is_featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title_ar: 'مشروع دفاية الفلفل - القليوبية',
        location: 'القليوبية',
        crop_type: 'فلفل',
        main_image_url: 'https://via.placeholder.com/400x300?text=Pepper+Greenhouse',
        is_featured: false,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title_ar: 'مشروع دفاية الأوراق الخضراء - الإسكندرية',
        location: 'الإسكندرية',
        crop_type: 'أوراق خضراء',
        main_image_url: 'https://via.placeholder.com/400x300?text=Leafy+Greenhouse',
        is_featured: false,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title_ar: 'مشروع دفاية الفراولة - دمياط',
        location: 'دمياط',
        crop_type: 'فراولة',
        main_image_url: 'https://via.placeholder.com/400x300?text=Strawberry+Greenhouse',
        is_featured: false,
        created_at: new Date().toISOString(),
      },
    ];
    await supabase.from('projects').insert(projects);

    // 4. إضافة المنتجات
    console.log('🛍️ إضافة المنتجات...');
    const products = [
      {
        id: randomUUID(),
        name_ar: 'نظام الري بالتنقيط',
        name_en: 'Drip Irrigation System',
        description_ar: 'نظام ري متطور يوفر 60% من المياه',
        description_en: 'Advanced irrigation system saves 60% water',
        price: 15000.00,
        image_url: 'https://via.placeholder.com/300x300?text=Drip+System',
        category: 'أنظمة الري',
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name_ar: 'مراوح التهوية',
        name_en: 'Ventilation Fans',
        description_ar: 'مراوح قوية لتهوية الدفايات',
        description_en: 'Powerful fans for greenhouse ventilation',
        price: 3500.00,
        image_url: 'https://via.placeholder.com/300x300?text=Fans',
        category: 'التهوية',
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name_ar: 'الأغطية البلاستيكية',
        name_en: 'Plastic Covers',
        description_ar: 'أغطية عالية الجودة مدة حياتها 5 سنوات',
        description_en: 'High quality covers with 5-year lifespan',
        price: 2000.00,
        image_url: 'https://via.placeholder.com/300x300?text=Plastic+Covers',
        category: 'المواد الأولية',
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name_ar: 'مقياس الرطوبة',
        name_en: 'Humidity Meter',
        description_ar: 'جهاز قياس الرطوبة والحرارة الرقمي',
        description_en: 'Digital humidity and temperature meter',
        price: 450.00,
        image_url: 'https://via.placeholder.com/300x300?text=Humidity+Meter',
        category: 'الأجهزة',
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name_ar: 'سماد عضوي',
        name_en: 'Organic Fertilizer',
        description_ar: 'سماد عضوي 100% طبيعي آمن وفعال',
        description_en: '100% natural organic fertilizer safe and effective',
        price: 150.00,
        image_url: 'https://via.placeholder.com/300x300?text=Organic+Fertilizer',
        category: 'الأسمدة',
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name_ar: 'مبيد حشري طبيعي',
        name_en: 'Natural Insecticide',
        description_ar: 'مبيد آمن خالي من المواد الكيميائية الضارة',
        description_en: 'Safe pesticide free from harmful chemicals',
        price: 80.00,
        image_url: 'https://via.placeholder.com/300x300?text=Insecticide',
        category: 'المبيدات',
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ];
    await supabase.from('products').insert(products);

    // 5. إضافة الطلبات
    console.log('📧 إضافة الطلبات...');
    const leads = [
      {
        id: randomUUID(),
        name: 'أحمد محمود',
        phone: '01001234567',
        email: 'ahmed@email.com',
        message: 'أريد استشارة عن نظام الري',
        status: 'new',
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: 'فاطمة علي',
        phone: '01012345678',
        email: 'fatima@email.com',
        message: 'هل توجد عروض على المبيدات؟',
        status: 'contacted',
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: 'محمد حسن',
        phone: '01023456789',
        email: 'mohammed@email.com',
        message: 'أريد تصميم دفاية جديدة',
        status: 'qualified',
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: 'ليلى محمد',
        phone: '01034567890',
        email: 'leila@email.com',
        message: 'شكراً على الخدمة الممتازة',
        status: 'qualified',
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: 'عمر خالد',
        phone: '01045678901',
        email: 'omar@email.com',
        message: 'غير مهتم الآن',
        status: 'rejected',
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: 'سارة إبراهيم',
        phone: '01056789012',
        email: 'sarah@email.com',
        message: 'متى يمكن الموعد؟',
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ];
    await supabase.from('leads').insert(leads);

    // 6. إضافة الأسئلة الشائعة
    console.log('❓ إضافة الأسئلة الشائعة...');
    const faqs = [
      {
        id: randomUUID(),
        question_ar: 'ما هي أفضل مواسم الزراعة؟',
        question_en: 'What are the best planting seasons?',
        answer_ar: 'معظم المحاصيل تزرع طول السنة في الدفايات، لكن الخريف والشتاء أفضل للإنتاجية العالية',
        answer_en: 'Most crops can be grown year-round in greenhouses, but fall and winter offer better productivity',
        category: 'الزراعة',
        order: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        question_ar: 'كم تكلفة بناء دفاية؟',
        question_en: 'How much does it cost to build a greenhouse?',
        answer_ar: 'التكلفة تعتمد على الحجم والمواد. دفاية 100م² تكلف حوالي 100,000 جنيه',
        answer_en: 'Cost depends on size and materials. A 100m² greenhouse costs around 100,000 EGP',
        category: 'التكاليف',
        order: 2,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        question_ar: 'هل نظام الري بالتنقيط فعال؟',
        question_en: 'Is drip irrigation effective?',
        answer_ar: 'نعم جداً! يوفر 60% من المياه ويقلل الأمراض ويزيد الإنتاجية',
        answer_en: 'Yes! It saves 60% water, reduces diseases, and increases productivity',
        category: 'الري',
        order: 3,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        question_ar: 'ما هي الأسمدة المناسبة للدفايات؟',
        question_en: 'What fertilizers are suitable for greenhouses?',
        answer_ar: 'نوصي بالأسمدة المتوازنة NPK مع الأسمدة العضوية للأفضل النتائج',
        answer_en: 'We recommend balanced NPK fertilizers with organic supplements for best results',
        category: 'الأسمدة',
        order: 4,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        question_ar: 'هل تقدمون خدمات الصيانة؟',
        question_en: 'Do you offer maintenance services?',
        answer_ar: 'نعم، نقدم خدمات صيانة دورية وإصلاح سريع',
        answer_en: 'Yes, we offer regular maintenance and quick repair services',
        category: 'الخدمات',
        order: 5,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        question_ar: 'كيف أتحكم بدرجة الحرارة؟',
        question_en: 'How to control temperature?',
        answer_ar: 'استخدم نظام التهوية والتظليل والري بالماء البارد',
        answer_en: 'Use ventilation systems, shading, and cold water irrigation',
        category: 'التحكم المناخي',
        order: 6,
        created_at: new Date().toISOString(),
      },
    ];
    await supabase.from('faq').insert(faqs);

    // 7. إضافة الوسائط
    console.log('📸 إضافة الوسائط...');
    const media = [
      {
        id: randomUUID(),
        file_url: 'https://via.placeholder.com/800x600?text=Greenhouse+1',
        file_name: 'greenhouse_01.jpg',
        file_type: 'image/jpeg',
        size: 256000,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        file_url: 'https://via.placeholder.com/800x600?text=Greenhouse+2',
        file_name: 'greenhouse_02.jpg',
        file_type: 'image/jpeg',
        size: 245000,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        file_url: 'https://via.placeholder.com/800x600?text=Irrigation+System',
        file_name: 'irrigation.jpg',
        file_type: 'image/jpeg',
        size: 298000,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        file_url: 'https://via.placeholder.com/800x600?text=Team+Work',
        file_name: 'team_work.jpg',
        file_type: 'image/jpeg',
        size: 267000,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        file_url: 'https://via.placeholder.com/800x600?text=Products+Catalog',
        file_name: 'catalog.pdf',
        file_type: 'application/pdf',
        size: 512000,
        created_at: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        file_url: 'https://via.placeholder.com/800x600?text=Training+Video',
        file_name: 'training_guide.mp4',
        file_type: 'video/mp4',
        size: 2048000,
        created_at: new Date().toISOString(),
      },
    ];
    await supabase.from('media').insert(media);

    console.log('');
    console.log('✅ تم إضافة جميع البيانات التجريبية بنجاح!');
    console.log('');
    console.log('البيانات المضافة:');
    console.log('✓ إعدادات الموقع (1)');
    console.log('✓ الخدمات (6)');
    console.log('✓ المشاريع (5)');
    console.log('✓ المنتجات (6)');
    console.log('✓ الطلبات (6)');
    console.log('✓ الأسئلة الشائعة (6)');
    console.log('✓ الوسائط (6)');
    console.log('');
    console.log('📊 الإجمالي: 36 سجل');
    console.log('');
    console.log('🌐 اذهب إلى: http://localhost:3002/#/admin/login');
    console.log('🔑 كلمة المرور: Hebly@12345@@');
    process.exit(0);
  } catch (error) {
    console.error('❌ حدث خطأ أثناء إضافة البيانات:');
    console.error(error);
    process.exit(1);
  }
}

// تشغيل السيد
seedDatabase();
