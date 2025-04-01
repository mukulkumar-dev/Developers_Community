
'use client';

import LoginForm from "@/components/LoginForm";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';

export default function LoginPage() {
  const images = [
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?cs=srgb&dl=pexels-divinetechygirl-1181244.jpg&fm=jpg', 
    'https://cdn.create.vista.com/api/media/small/356459920/stock-photo-partial-view-male-hands-laptop-headphones-table-coworking-space',
    'https://arqus-alliance.eu/wp-content/uploads/2023/05/communities-1024x683.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-400 to-blue-600 text-white items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl">
        
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center w-full md:w-1/2 px-8"
        >
          <h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
          <p className="mb-4 text-gray-100">Don't have an account? <Link href="/signup" className="text-blue-600">Sign up</Link></p>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-4 w-full p-3 rounded-lg bg-gray-200 border border-gray-600 text-black focus:outline-none focus:border-purple-500"
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
              <Link href="#" className="text-blue-600 text-xm">Forgot password?</Link>
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
            >
              Log in
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
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-purple-700 to-gray-900 p-8 relative rounded-r-2xl"
        >
          <div className="absolute inset-0 bg-cover bg-center rounded-r-2xl" style={{ 
            backgroundImage: `url(${selectedImage})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
          <div className="absolute bottom-4 flex space-x-3 z-10">
            {images.map((img, index) => (
              <button 
                key={index} 
                onMouseEnter={() => setSelectedImage(img)} 
                className={`w-4 h-4 rounded-full ${selectedImage === img ? 'bg-white' : 'bg-gray-500'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
