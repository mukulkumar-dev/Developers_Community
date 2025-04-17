import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

const useDiscussionStore = create((set,get) => ({
  submitting: false,
  error: null,
  user: null,
  isAuthenticated: false,
  loadingPage: true,
  discussions: [],
  loading: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
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

  createDiscussion: async (formData) => {
    set({ submitting: true, error: null });
    try {
      const res = await axiosInstance.post('discussion/create', formData);
      return res.data;
    } catch (error) {
      const err = error.response?.data || { error: 'Failed to create discussion' };
      set({ error: err });
      throw err;
    } finally {
      set({ submitting: false });
    }
  },

  getAllDiscussions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/discussion/all");
      set({ discussions: res.data });
    } catch (error) {
      const err = error.response?.data || { error: "Failed to fetch discussions" };
      set({ error: err.error });
    } finally {
      set({ loading: false });
    }
  },

   likeDiscussion: async (discussionId) => {
  try {
    const res = await axiosInstance.put(`/discussion/like/${discussionId}`);
    const updatedDiscussions = get().discussions.map((d) =>
      d._id === discussionId
        ? {
            ...d,
            likes: res.data.totalLikes,
            userLiked: res.data.userLiked, // set based on response, better than toggling manually
          }
        : d
    );
    set({ discussions: updatedDiscussions });
  } catch (error) {
    console.error("Failed to like discussion:", error);
  }
},

  addComment: async (discussionId, text) => {
  try {
    const res = await axiosInstance.post(`/discussion/comment/${discussionId}`, { text });
    const newComment = res.data.comments;

    const updatedDiscussions = get().discussions.map((d) =>
      d._id === discussionId
        ? {
            ...d,
            comments: [...(d.comments || []), newComment]
          }
        : d
    );

    set({ discussions: updatedDiscussions });
  } catch (error) {
    console.error("Failed to add comment:", error);
  }
},

}));

export default useDiscussionStore;
