import { supabase } from '../lib/supabase';
import { FAQ } from '../types';

export const faqService = {
  async getFAQ(): Promise<FAQ[]> {
    try {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching FAQ:', error);
      return [];
    }
  },

  async getFAQByCategory(category: string): Promise<FAQ[]> {
    try {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .eq('category', category)
        .order('order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching FAQ by category:', error);
      return [];
    }
  },

  async createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ> {
    try {
      const { data, error } = await supabase
        .from('faq')
        .insert([{ ...faq, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }
  },

  async updateFAQ(id: string, faq: Partial<FAQ>): Promise<FAQ> {
    try {
      const { data, error } = await supabase
        .from('faq')
        .update(faq)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }
  },

  async deleteFAQ(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('faq')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw error;
    }
  }
};
