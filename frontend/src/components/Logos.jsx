"use client";
import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "https://cdn-icons-png.flaticon.com/128/5968/5968350.png",
  "https://cdn-icons-png.flaticon.com/128/711/711284.png",
  "https://cdn-icons-png.flaticon.com/128/1199/1199124.png",
  "https://cdn-icons-png.flaticon.com/128/5968/5968381.png",
  "https://cdn-icons-png.flaticon.com/128/1199/1199128.png",
  "https://cdn-icons-png.flaticon.com/128/15379/15379746.png",
  "https://cdn-icons-png.flaticon.com/128/875/875209.png",
  "https://img.icons8.com/?size=100&id=Lk2Q5FRKDWGI&format=png&color=000000",
  "https://img.icons8.com/?size=96&id=bosfpvRzNOG8&format=png",
  "https://img.icons8.com/?size=100&id=13679&format=png&color=000000"
  
];
const logos2 = [
  "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=12599&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=55199&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=cvzmaEA4kC0o&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=17842&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=108792&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=17836&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=30840&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  
];

export default function InfiniteLogos() {

    const statsData = [
        { label: "Developers", value: 1000 },
        { label: "Projects", value: 1200 },
        { label: "Active Users", value: 8000 },
      ];

      const [stats, setStats] = useState(
        statsData.map((stat) => ({ ...stat, animatedValue: 0 }))
      );
    
      useEffect(() => {
        const interval = setInterval(() => {
          setStats((prevStats) =>
            prevStats.map((stat) => ({
              ...stat,
              animatedValue:
                stat.animatedValue < stat.value ? stat.animatedValue + 1 : stat.value,
            }))
          );
        }, 50); // Adjust speed (lower = faster)
    
        return () => clearInterval(interval);
      }, [stats]);

  return (
    <>
    <div className="w-full overflow-hidden bg-white py-6 relative">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }} // Moves exactly half the width to avoid gaps
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Smooth infinite loop
      >
        {/* Duplicate the logo set to create a seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="w-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md px-6 py-4 mx-2">
            <img src={logo} alt="Logo" width={120} height={60} />
          </div>
        ))}
      </motion.div>
    </div>
    <div className="w-full overflow-hidden bg-white py-6 relative">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }} // Moves exactly half the width to avoid gaps
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Smooth infinite loop
      >
        {/* Duplicate the logo set to create a seamless loop */}
        {[...logos2, ...logos2].map((logo, index) => (
          <div key={index} className="w-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md px-6 py-4 mx-2">
            <img src={logo} alt="Logo" width={120} height={80} />
          </div>
        ))}
      </motion.div>
    </div>
    <div className="flex justify-between items-center gap-16 py-10 bg-white mt-8 mb-40 px-44">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <h2 className="text-9xl md:text-5xl font-bold text-blue-900">
            {stat.animatedValue}
            <span className="text-blue-600">+</span>
          </h2>
          <p className="text-gray-600 text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
    </>
  );
}
