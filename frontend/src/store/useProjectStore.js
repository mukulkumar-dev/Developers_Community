import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,
  submitting: false,
  user: null,
  isAuthenticated: false,
  loadingPage: true,

  // Simulate auth check (can be replaced with real auth logic)
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check'); // Example route
      set({
        user: res.data.user,
        isAuthenticated: true,
        loadingPage: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loadingPage: false,
      });
    }
  },

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/projects/all');
      set({ projects: res.data.projects || res.data, loading: false });
    } catch (err) {
      console.error('Fetch error:', err);
      set({ error: err.message || 'Failed to fetch projects', loading: false });
    }
  },

  createProject: async (formData) => {
    set({ submitting: true });
    try {
      const res = await axiosInstance.post('/projects/create', formData);
      return res.data;
    } catch (error) {
      console.error("Create project error:", error);
      throw error;
    } finally {
      set({ submitting: false });
    }
  },
}));

export default useProjectStore;