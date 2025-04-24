
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header to requests if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Handle 401 unauthorized errors (token expired, etc.)
    if (error.response?.status === 401) {
      toast({
        title: 'Authentication Error',
        description: message,
        variant: 'destructive',
      });
      
      // Clear token and redirect to login if not already on login page
      localStorage.removeItem('token');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      // Handle 403 forbidden errors
      toast({
        title: 'Permission Denied',
        description: message,
        variant: 'destructive',
      });
    } else if (error.response?.status === 500) {
      // Handle 500 server errors
      toast({
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
        variant: 'destructive',
      });
    } else {
      // Handle other errors
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Project API
export const projectAPI = {
  createProject: (projectData) => api.post('/projects', projectData),
  getProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  likeProject: (id) => api.post(`/projects/${id}/like`),
  commentOnProject: (id, text) => api.post(`/projects/${id}/comments`, { text }),
  deleteComment: (projectId, commentId) => api.delete(`/projects/${projectId}/comments/${commentId}`),
};

// Blog API
export const blogAPI = {
  createBlog: (blogData) => api.post('/blogs', blogData),
  getBlogs: (params) => api.get('/blogs', { params }),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  likeBlog: (id) => api.post(`/blogs/${id}/like`),
  commentOnBlog: (id, text) => api.post(`/blogs/${id}/comments`, { text }),
  deleteComment: (blogId, commentId) => api.delete(`/blogs/${blogId}/comments/${commentId}`),
};

// Question API
export const questionAPI = {
  createQuestion: (questionData) => api.post('/questions', questionData),
  getQuestions: (params) => api.get('/questions', { params }),
  getQuestionById: (id) => api.get(`/questions/${id}`),
  updateQuestion: (id, questionData) => api.put(`/questions/${id}`, questionData),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
  upvoteQuestion: (id) => api.post(`/questions/${id}/upvote`),
  addAnswer: (id, content) => api.post(`/questions/${id}/answers`, { content }),
  updateAnswer: (questionId, answerId, content) => 
    api.put(`/questions/${questionId}/answers/${answerId}`, { content }),
  deleteAnswer: (questionId, answerId) => 
    api.delete(`/questions/${questionId}/answers/${answerId}`),
  acceptAnswer: (questionId, answerId) => 
    api.put(`/questions/${questionId}/answers/${answerId}/accept`),
  upvoteAnswer: (questionId, answerId) => 
    api.post(`/questions/${questionId}/answers/${answerId}/upvote`),
};

// Event API
export const eventAPI = {
  createEvent: (eventData) => api.post('/events', eventData),
  getEvents: (params) => api.get('/events', { params }),
  getEventById: (id) => api.get(`/events/${id}`),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  attendEvent: (id) => api.post(`/events/${id}/attend`),
};

// User API
export const userAPI = {
  getUserProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (userData) => api.put('/users/profile', userData),
  updatePassword: (passwordData) => api.put('/users/password', passwordData),
  getUserProjects: (id, params) => api.get(`/users/${id}/projects`, { params }),
  getUserBlogs: (id, params) => api.get(`/users/${id}/blogs`, { params }),
  getUserQuestions: (id, params) => api.get(`/users/${id}/questions`, { params }),
};

export default api;
