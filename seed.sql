-- Seed Data for Sunrise Greenhouses CMS

-- 1. إدراج إعدادات الموقع
INSERT INTO site_settings (
  id, primary_color, secondary_color, font_family, logo_url,
  company_name_ar, company_name_en, tagline_ar, tagline_en,
  contact_phone, contact_email, whatsapp_number, address_ar,
  hero_panorama_url, created_at
) VALUES (
  gen_random_uuid(),
  '#10b981',
  '#059669',
  'Cairo',
  'https://via.placeholder.com/200x80?text=Sunrise+Greenhouses',
  'صن رايز للدفايات',
  'Sunrise Greenhouses',
  'حلول زراعية حديثة للمستقبل',
  'Modern Agricultural Solutions for the Future',
  '+20 100 123 4567',
  'info@sunrise-greenhouses.com',
  '+20 100 123 4567',
  'القاهرة - مصر',
  'https://via.placeholder.com/1920x600?text=Sunrise+Greenhouses',
  NOW()
);

-- 2. إدراج الخدمات
INSERT INTO services (id, slug, name_ar, name_en, short_description_ar, icon, is_featured, created_at) VALUES
(gen_random_uuid(), 'irrigation-systems', 'أنظمة الري الحديثة', 'Modern Irrigation Systems', 'أنظمة ري متقدمة موفرة للمياه والطاقة', '💧', true, NOW()),
(gen_random_uuid(), 'greenhouse-design', 'تصميم وإنشاء الدفايات', 'Greenhouse Design & Construction', 'تصميم وبناء دفايات بأعلى المواصفات', '🏠', true, NOW()),
(gen_random_uuid(), 'climate-control', 'التحكم بالمناخ', 'Climate Control Systems', 'أنظمة تحكم بدرجة الحرارة والرطوبة', '❄️', true, NOW()),
(gen_random_uuid(), 'soil-management', 'إدارة التربة', 'Soil Management', 'استشارات متخصصة في تحسين التربة', '🌱', false, NOW()),
(gen_remote_uuid(), 'pest-control', 'مكافحة الآفات', 'Pest Control Solutions', 'حلول آمنة وفعالة لمكافحة الآفات', '🐛', false, NOW()),
(gen_random_uuid(), 'fertilizers', 'الأسمدة المتخصصة', 'Specialized Fertilizers', 'أسمدة عضوية وكيميائية متوازنة', '🧪', false, NOW());

-- 3. إدراج المشاريع
INSERT INTO projects (id, title_ar, location, crop_type, main_image_url, is_featured, created_at) VALUES
(gen_random_uuid(), 'مشروع دفاية الطماطم - المنوفية', 'المنوفية', 'طماطم', 'https://via.placeholder.com/400x300?text=Tomato+Greenhouse', true, NOW()),
(gen_random_uuid(), 'مشروع دفاية الخيار - الجيزة', 'الجيزة', 'خيار', 'https://via.placeholder.com/400x300?text=Cucumber+Greenhouse', true, NOW()),
(gen_random_uuid(), 'مشروع دفاية الفلفل - القليوبية', 'القليوبية', 'فلفل', 'https://via.placeholder.com/400x300?text=Pepper+Greenhouse', false, NOW()),
(gen_random_uuid(), 'مشروع دفاية الأوراق الخضراء - الإسكندرية', 'الإسكندرية', 'أوراق خضراء', 'https://via.placeholder.com/400x300?text=Leafy+Greenhouse', false, NOW()),
(gen_random_uuid(), 'مشروع دفاية الفراولة - دمياط', 'دمياط', 'فراولة', 'https://via.placeholder.com/400x300?text=Strawberry+Greenhouse', false, NOW());

-- 4. إدراج المنتجات
INSERT INTO products (id, name_ar, name_en, description_ar, description_en, price, image_url, category, is_active, created_at) VALUES
(gen_random_uuid(), 'نظام الري بالتنقيط', 'Drip Irrigation System', 'نظام ري متطور يوفر 60% من المياه', 'Advanced irrigation system saves 60% water', 15000.00, 'https://via.placeholder.com/300x300?text=Drip+System', 'أنظمة الري', true, NOW()),
(gen_random_uuid(), 'مراوح التهوية', 'Ventilation Fans', 'مراوح قوية لتهوية الدفايات', 'Powerful fans for greenhouse ventilation', 3500.00, 'https://via.placeholder.com/300x300?text=Fans', 'التهوية', true, NOW()),
(gen_random_uuid(), 'الأغطية البلاستيكية', 'Plastic Covers', 'أغطية عالية الجودة مدة حياتها 5 سنوات', 'High quality covers with 5-year lifespan', 2000.00, 'https://via.placeholder.com/300x300?text=Plastic+Covers', 'المواد الأولية', true, NOW()),
(gen_random_uuid(), 'مقياس الرطوبة', 'Humidity Meter', 'جهاز قياس الرطوبة والحرارة الرقمي', 'Digital humidity and temperature meter', 450.00, 'https://via.placeholder.com/300x300?text=Humidity+Meter', 'الأجهزة', true, NOW()),
(gen_random_uuid(), 'سماد عضوي', 'Organic Fertilizer', 'سماد عضوي 100% طبيعي آمن وفعال', '100% natural organic fertilizer safe and effective', 150.00, 'https://via.placeholder.com/300x300?text=Organic+Fertilizer', 'الأسمدة', true, NOW()),
(gen_random_uuid(), 'مبيد حشري طبيعي', 'Natural Insecticide', 'مبيد آمن خالي من المواد الكيميائية الضارة', 'Safe pesticide free from harmful chemicals', 80.00, 'https://via.placeholder.com/300x300?text=Insecticide', 'المبيدات', true, NOW());

-- 5. إدراج الطلبات
INSERT INTO leads (id, name, phone, email, message, status, created_at) VALUES
(gen_random_uuid(), 'أحمد محمود', '01001234567', 'ahmed@email.com', 'أريد استشارة عن نظام الري', 'new', NOW()),
(gen_random_uuid(), 'فاطمة علي', '01012345678', 'fatima@email.com', 'هل توجد عروض على المبيدات؟', 'contacted', NOW()),
(gen_random_uuid(), 'محمد حسن', '01023456789', 'mohammed@email.com', 'أريد تصميم دفاية جديدة', 'qualified', NOW()),
(gen_random_uuid(), 'ليلى محمد', '01034567890', 'leila@email.com', 'شكراً على الخدمة الممتازة', 'qualified', NOW()),
(gen_random_uuid(), 'عمر خالد', '01045678901', 'omar@email.com', 'غير مهتم الآن', 'rejected', NOW()),
(gen_random_uuid(), 'سارة إبراهيم', '01056789012', 'sarah@email.com', 'متى يمكن الموعد؟', 'new', NOW());

-- 6. إدراج الأسئلة الشائعة
INSERT INTO faq (id, question_ar, question_en, answer_ar, answer_en, category, "order", created_at) VALUES
(gen_random_uuid(), 'ما هي أفضل مواسم الزراعة؟', 'What are the best planting seasons?', 'معظم المحاصيل تزرع طول السنة في الدفايات، لكن الخريف والشتاء أفضل للإنتاجية العالية', 'Most crops can be grown year-round in greenhouses, but fall and winter offer better productivity', 'الزراعة', 1, NOW()),
(gen_random_uuid(), 'كم تكلفة بناء دفاية؟', 'How much does it cost to build a greenhouse?', 'التكلفة تعتمد على الحجم والمواد. دفاية 100م² تكلف حوالي 100,000 جنيه', 'Cost depends on size and materials. A 100m² greenhouse costs around 100,000 EGP', 'التكاليف', 2, NOW()),
(gen_random_uuid(), 'هل نظام الري بالتنقيط فعال؟', 'Is drip irrigation effective?', 'نعم جداً! يوفر 60% من المياه ويقلل الأمراض ويزيد الإنتاجية', 'Yes! It saves 60% water, reduces diseases, and increases productivity', 'الري', 3, NOW()),
(gen_random_uuid(), 'ما هي الأسمدة المناسبة للدفايات؟', 'What fertilizers are suitable for greenhouses?', 'نوصي بالأسمدة المتوازنة NPK مع الأسمدة العضوية للأفضل النتائج', 'We recommend balanced NPK fertilizers with organic supplements for best results', 'الأسمدة', 4, NOW()),
(gen_random_uuid(), 'هل تقدمون خدمات الصيانة؟', 'Do you offer maintenance services?', 'نعم، نقدم خدمات صيانة دورية وإصلاح سريع', 'Yes, we offer regular maintenance and quick repair services', 'الخدمات', 5, NOW()),
(gen_random_uuid(), 'كيف أتحكم بدرجة الحرارة؟', 'How to control temperature?', 'استخدم نظام التهوية والتظليل والري بالماء البارد', 'Use ventilation systems, shading, and cold water irrigation', 'التحكم المناخي', 6, NOW());

-- 7. إدراج الوسائط
INSERT INTO media (id, file_url, file_name, file_type, size, created_at) VALUES
(gen_random_uuid(), 'https://via.placeholder.com/800x600?text=Greenhouse+1', 'greenhouse_01.jpg', 'image/jpeg', 256000, NOW()),
(gen_random_uuid(), 'https://via.placeholder.com/800x600?text=Greenhouse+2', 'greenhouse_02.jpg', 'image/jpeg', 245000, NOW()),
(gen_random_uuid(), 'https://via.placeholder.com/800x600?text=Irrigation+System', 'irrigation.jpg', 'image/jpeg', 298000, NOW()),
(gen_random_uuid(), 'https://via.placeholder.com/800x600?text=Team+Work', 'team_work.jpg', 'image/jpeg', 267000, NOW()),
(gen_random_uuid(), 'https://via.placeholder.com/800x600?text=Products+Catalog', 'catalog.pdf', 'application/pdf', 512000, NOW()),
(gen_random_uuid(), 'https://via.placeholder.com/800x600?text=Training+Video', 'training_guide.mp4', 'video/mp4', 2048000, NOW());
