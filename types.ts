
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor'
}

export interface SiteSettings {
  id: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  logo_url: string;
  company_name_ar: string;
  company_name_en: string;
  tagline_ar: string;
  tagline_en: string;
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
  address_ar: string;
  hero_panorama_url: string;
}

export interface Service {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  short_description_ar: string;
  icon: string;
  is_featured: boolean;
}

export interface Project {
  id: string;
  title_ar: string;
  location: string;
  crop_type: string;
  main_image_url: string;
  is_featured: boolean;
}

export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  category: string;
  order: number;
  created_at: string;
}

export interface MediaItem {
  id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  size: number;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'rejected';
  created_at: string;
}

