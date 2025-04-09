import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,


    // ✅ Check if the user is authenticated
    checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/me");
          set({ authUser: res.data }); 
          return res.data; 
        } catch (error) {
          set({ authUser: null });
          console.log("❌ Auth failed:", error?.response?.data || error.message);
          return null;
        } finally {
          set({ isCheckingAuth: false }); 
        }
      }, 

    // ✅ Signup Function
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Welcome to Devoloper Community! 🎉"); // ✅ Success message
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed"); // ✅ Show error message
        } finally {
            set({ isSigningUp: false });
        }
    },


    // ✅ Login Function
    login: async (data, router) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful!");
            router.push("/dashboard");
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid credentials";
            toast.error(errorMessage);
            throw new Error(errorMessage); // Ensure thrown error is a proper Error instance
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // ✅ Logout Function
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    // ✅ Update Profile Function
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));
