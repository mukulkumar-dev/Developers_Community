"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [selectedImage, setSelectedImage] = useState(
    "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?cs=srgb&dl=pexels-divinetechygirl-1181244.jpg&fm=jpg"
  );
  const images = [
    "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?cs=srgb&dl=pexels-divinetechygirl-1181244.jpg&fm=jpg",
    "https://cdn.create.vista.com/api/media/small/356459920/stock-photo-partial-view-male-hands-laptop-headphones-table-coworking-space",
    "https://arqus-alliance.eu/wp-content/uploads/2023/05/communities-1024x683.jpg",
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { signup, checkAuth, authUser, isCheckingAuth } = useAuthStore(); // Access Zustand store

  // Check authentication status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (authUser) {
        router.push("/dashboard"); // Redirect if already authenticated
      }
    };
    verifyAuth();
  }, [checkAuth, authUser, router]);

  // Prevent rendering signup page while checking authentication or if user is authenticated
  if (isCheckingAuth || authUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-12 w-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </motion.div>
    );
  }

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");
    try {
      await signup(formData);
      toast.dismiss(toastId);
      router.push("/dashboard"); // Redirect after successful signup
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-400 to-blue-600 text-white items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-purple-700 to-gray-900 p-8 relative rounded-l-2xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-l-2xl"
            style={{ backgroundImage: `url(${selectedImage})` }}
          ></div>
          <div className="absolute bottom-4 flex space-x-3 z-10">
            {images.map((img, index) => (
              <button
                key={index}
                onMouseEnter={() => setSelectedImage(img)}
                className={`w-4 h-4 rounded-full ${selectedImage === img ? "bg-white" : "bg-gray-500"
                  }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center w-full md:w-1/2 px-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Create an account</h2>
          <p className="mb-4 text-gray-200">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Log in
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-4 w-full p-3 rounded-lg bg-gray-200 text-black border border-gray-600 focus:outline-none focus:border-purple-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-4 w-full p-3 rounded-lg bg-gray-200 text-black border border-gray-600 focus:outline-none focus:border-purple-500"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-4 w-full p-3 rounded-lg bg-gray-200 text-black border border-gray-600 focus:outline-none focus:border-purple-500"
            />

            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-200 text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-900 font-semibold">
                  Terms & Conditions
                </a>
              </p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold`}
            >
              Create account
            </motion.button>
          </form>

          <div className="flex items-center justify-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-200">Or register with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="flex gap-4">
            <button className="flex items-center justify-center w-full p-[10px] bg-[#ddd] hover:bg-[#ccc] transition rounded-lg">
              Google Signup
            </button>
          </div>
        </motion.div>
      </div>

      {/* Toast container */}
      <Toaster />
    </div>
  );
}
