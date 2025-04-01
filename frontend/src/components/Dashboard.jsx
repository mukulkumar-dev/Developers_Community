"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaEnvelope,
  FaBriefcase,
  FaEllipsisH,
  FaHeart,
  FaComment,
  FaSave,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed h-full p-5 shadow-lg text-white transition-all duration-300 ${
          sidebarExpanded ? "w-60" : "w-20"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(0,91,234,1) 0%, rgba(102,0,255,1) 100%)",
        }}
      >
        {/* Sidebar Toggle Button */}
        <button
          className="absolute top-5 right-5 text-white text-xl focus:outline-none"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          {sidebarExpanded ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar Content */}
        <h1 className="text-2xl font-bold transition-opacity duration-300 mt-10">
          {sidebarExpanded && "Dashboard"}
        </h1>
        <nav className="mt-5">
          <ul className="space-y-4">
            {[
              ["Home", FaHome],
              ["My Network", FaUsers],
              ["Messages", FaEnvelope],
              ["Jobs", FaBriefcase],
              ["More", FaEllipsisH],
            ].map(([text, Icon], index) => (
              <li
                key={index}
                className="flex items-center space-x-3 hover:bg-blue-500 p-3 rounded-lg cursor-pointer transition-all"
              >
                <Icon size={22} />
                {sidebarExpanded && <span>{text}</span>}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all ${
          sidebarExpanded ? "ml-60" : "ml-20"
        }`}
      >
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* News Feed Section (Takes 2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold">
                      Holo D. Wisewolf <span className="text-blue-500">✔</span>
                    </h2>
                    <p className="text-gray-500 text-sm">Posted 3m ago</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-700">
                  I’ve been struggling with severe headaches for years, but
                  recently I’ve found some relief thanks to Doc Nightingale AI!
                  🎉🙌
                </p>
                <p className="text-blue-500 mt-2">
                  #goodbyeheadache #nightingalerocks
                </p>
                <img
                  src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?cs=srgb&dl=pexels-fauxels-3182773.jpg&fm=jpg"
                  alt="UI/UX Design"
                  className="w-full mt-4 rounded-xl"
                />
                <div className="flex justify-between items-center mt-3 text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaHeart /> 5,874
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment /> 215
                  </span>
                  <span className="flex items-center gap-1">
                    <FaSave /> 11
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Contacts Section (Takes 1/3 width) */}
          <div className="bg-white p-5 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Contacts
            </h2>
            <p className="text-gray-600 mb-4">
              Connect with professionals and expand your network.
            </p>

            <div className="space-y-4">
              {[
                ["John Doe", "Software Engineer"],
                ["Jane Smith", "Data Scientist"],
                ["Alice Brown", "UX Designer"],
                ["Michael Lee", "DevOps Engineer"],
              ].map(([name, role], index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                      alt={name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-gray-800 font-medium">{name}</h3>
                      <p className="text-gray-500 text-sm">{role}</p>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                    Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
