import { supabase } from '../lib/supabase';
import { MediaItem } from '../types';

export const mediaService = {
  async getMedia(): Promise<MediaItem[]> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching media:', error);
      return [];
    }
  },

  async getMediaByType(fileType: string): Promise<MediaItem[]> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('file_type', fileType)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching media by type:', error);
      return [];
    }
  },

  async uploadFile(file: File, fileUrl: string): Promise<MediaItem> {
    try {
      // Upload to Supabase storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create media record in database
      const mediaItem: Omit<MediaItem, 'id'> = {
        file_url: fileUrl,
        file_name: file.name,
        file_type: file.type,
        size: file.size,
        created_at: new Date().toISOString()
      };

      const { data: dbData, error: dbError } = await supabase
        .from('media')
        .insert([mediaItem])
        .select()
        .single();

      if (dbError) throw dbError;
      return dbData;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async deleteMedia(id: string, filePath: string): Promise<void> {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath]);

      if (storageError) console.error('Storage deletion error:', storageError);

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  }
};
