
import React from 'react';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  Wind, 
  Settings, 
  Users, 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon,
  Phone,
  MessageSquare
} from 'lucide-react';

export const ICONS = {
  Greenhouse: <Sprout className="w-6 h-6" />,
  Irrigation: <Droplets className="w-6 h-6" />,
  Climate: <Sun className="w-6 h-6" />,
  Ventilation: <Wind className="w-6 h-6" />,
  Dashboard: <LayoutDashboard className="w-5 h-5" />,
  Content: <FileText className="w-5 h-5" />,
  Media: <ImageIcon className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Leads: <Users className="w-5 h-5" />,
  Contact: <Phone className="w-5 h-5" />,
  FAQ: <MessageSquare className="w-5 h-5" />,
};

export const MOCK_SETTINGS = {
  primary_color: '#10B981',
  company_name_ar: 'صن رايز للصوبات الزراعية',
  company_name_en: 'SunRise Greenhouses',
  tagline_ar: 'نحو مستقبل زراعي مستدام بأحدث التقنيات العالمية',
  hero_panorama_url: 'https://images.unsplash.com/photo-1585059895311-9e73b4d45863?auto=format&fit=crop&q=80&w=2000',
};
