import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './constants';

export const MenuService = {
  save: async (items) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Failed to save menu', e);
      throw new Error('Failed to save menu data');
    }
  },

  load: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Failed to load menu', e);
      throw new Error('Failed to load menu data');
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error('Failed to clear menu', e);
      throw new Error('Failed to clear menu data');
    }
  }
};

export default MenuService;
