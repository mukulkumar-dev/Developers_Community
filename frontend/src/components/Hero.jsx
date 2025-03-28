import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen relative bg-white py-8 px-8 overflow-hidden">
      {/* Hero Section */}
      <section className="bg-white text-black flex flex-col items-center justify-center p-8">
        {/* Animated Background Floating Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-10 right-10 bg-blue-500 w-32 h-32 rounded-full opacity-30 blur-xl"
        ></motion.div>

        {/* Title Animation */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-8xl mt-8 font-extrabold text-center text-black"
        >
          Develop Faster.
          <br />
          Run Anywhere.
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl mt-5 font-bold"
        >
          Build with the{" "}
          <span className="text-blue-500">#1 most-used developer tool</span>
        </motion.h2>

        {/* Buttons Animation */}
        <motion.div
          className="mt-6 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 text-white bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded-md text-lg cursor-pointer"
          >
            Join the Community
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 border border-gray-200 px-6 py-3 rounded-md hover:bg-gray-300 text-lg cursor-pointer"
          >
            Explore Projects
          </motion.button>
        </motion.div>
      </section>

      {/* Wave SVG Animation */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full"
      >
        <svg
          viewBox="0 0 1220 220"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#0000cd"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,186.7C840,171,960,117,1080,101.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </section>
  );
}
