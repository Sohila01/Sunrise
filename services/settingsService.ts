import { supabase } from '../lib/supabase';
import { SiteSettings } from '../types';

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      // الحصول على معرف الإعدادات (عادة يكون هناك سجل واحد فقط)
      const { data: existingData } = await supabase
        .from('site_settings')
        .select('id')
        .single();
      
      const settingsId = existingData?.id || settings.id;
      
      const { data, error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', settingsId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};
