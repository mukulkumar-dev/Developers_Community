"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const images = [
    "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    "https://cdn.create.vista.com/api/media/small/356459920/stock-photo-partial-view-male-hands-laptop-headphones-table-coworking-space",
    "https://arqus-alliance.eu/wp-content/uploads/2023/05/communities-1024x683.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login, checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (authUser) {
        router.push("/dashboard");
      }
    };
    verifyAuth();
  }, [checkAuth, authUser, router]);

  if (isCheckingAuth || authUser) {
    return (
      <motion.div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-12 w-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </motion.div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const toastId = toast.loading("Logging in...");
    try {
      await login(formData, router);
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-400 to-blue-600 text-white items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col md:flex-row md:gap-x-20 w-full max-w-4xl overflow-hidden">

        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center w-full md:w-1/2 px-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Log in to your account</h2>
          <p className="mb-4 text-gray-100">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-800 underline">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-4 w-full p-3 rounded-lg bg-gray-200 border border-gray-600 text-black focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="mt-4 w-full p-3 rounded-lg bg-gray-200 border border-gray-600 text-black focus:outline-none focus:border-purple-500"
              required
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <p className="text-gray-100 text-sm">Remember me</p>
              </div>
              <Link href="#" className="text-blue-800 text-sm underline">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold ${
                isLoggingIn ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Log in"}
            </motion.button>
          </form>

          <div className="flex items-center justify-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-200">Or log in with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="flex gap-4">
            <button className="flex items-center justify-center w-1/2 p-3 bg-gray-200 text-black hover:bg-gray-300 transition rounded-lg">
              <FaGoogle className="mr-2" /> Google
            </button>
            <button className="flex items-center justify-center w-1/2 p-3 bg-gray-200 text-black hover:bg-gray-300 transition rounded-lg">
              <FaApple className="mr-2" /> Apple
            </button>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative hidden md:flex flex-col items-center justify-center w-1/2 rounded-r-xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedImage})` }}
          />
          <div className="absolute inset-0 bg-black opacity-40 z-0" />
          <div className="z-10 text-white text-center px-6">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-sm text-gray-200">Enter your credentials to access your dashboard.</p>
          </div>
          <div className="absolute bottom-6 flex space-x-3 z-10">
            {images.map((img, index) => (
              <button
                key={index}
                onMouseEnter={() => setSelectedImage(img)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  selectedImage === img ? "bg-white scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}
