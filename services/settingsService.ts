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
      const { data: existingData, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1);
      
      if (fetchError) {
        console.error('Error fetching existing settings:', fetchError);
        throw new Error(`خطأ في جلب الإعدادات: ${fetchError.message}`);
      }
      
      if (!existingData || existingData.length === 0) {
        throw new Error('لم يتم العثور على سجل الإعدادات في قاعدة البيانات');
      }
      
      const settingsId = existingData[0].id;
      
      const { data, error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', settingsId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating settings:', error);
        throw new Error(`خطأ في تحديث الإعدادات: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('فشل في استرجاع الإعدادات بعد التحديث');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};
