"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Features() {
  const [search, setSearch] = useState(""); // 🔍 Add state for search input

  const requests = [
    {
      title: "Change Menu Text from 'Start Debugging' to 'Run'",
      user: "Steve Smith",
      date: "April 16, 2024",
      votes: 82,
      comments: 12,
      status: "Under Review",
      tags: ["Windows 10", "Debugger", "Visual Studio 2022"],
    },
    {
      title: "Add syntax coloring to immediate window while debugging",
      user: "Harshada Chandrakant Hole [MSFT]",
      date: "Nov 06, 2024",
      votes: 65,
      comments: 6,
      status: "Under Review",
      tags: ["Windows 10", "Debugger", "Visual Studio 2022"],
    },
  ];

  // 🔍 Filter requests based on search input
  const filteredRequests = requests.filter((request) =>
    request.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-r from-black to-purple-900 text-white flex flex-col items-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full"
      >
        <h2 className="text-4xl font-bold text-center">Existing Feature Requests</h2>

        {/* 🔍 Search Input */}
        <div className="mt-6 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search feature requests..."
            value={search} // ✅ Controlled input
            onChange={(e) => setSearch(e.target.value)} // ✅ Update state
            className="w-2/3 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => console.log("Search Query:", search)} // Just for debugging
            className="ml-4 bg-purple-500 px-6 py-3 rounded-lg font-bold"
          >
            Search
          </button>
        </div>

        {/* 🔍 Display Filtered Results */}
        <div className="mt-8 space-y-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <motion.div
                key={index}
                className="p-6  bg-opacity-40 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold">{request.title}</h3>
                <p className="text-gray-400 text-sm">
                  {request.user} - {request.date}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-yellow-400">{request.votes} Votes</span>
                  <span className="text-blue-400">{request.comments} Comments</span>
                  <span className="bg-purple-500 px-3 py-1 rounded-lg text-sm">
                    {request.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {request.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-700 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No matching results found.</p>
          )}
        </div>
      </motion.div>
      
    </section>
  );
}
