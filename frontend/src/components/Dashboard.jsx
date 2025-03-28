'use client';

import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => (
  <motion.aside
    className="w-64 bg-blue-700 h-screen p-6 text-white fixed left-0 top-0 flex flex-col justify-between"
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div>
      <div className="mb-6 text-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
        <h2 className="mt-2 text-lg font-semibold">Georgi Danielyan</h2>
        <p className="text-sm">UI/UX Designer - Self Employed</p>
      </div>
      <div className="text-center mb-6">
        <p>
          Followers: <span className="font-semibold">500</span>
        </p>
        <p>
          Following: <span className="font-semibold">120</span>
        </p>
      </div>
      <nav>
        <ul className="space-y-4">
          <li className="hover:bg-blue-600 p-2 rounded">My Network</li>
          <li className="hover:bg-blue-600 p-2 rounded">Messages</li>
          <li className="hover:bg-blue-600 p-2 rounded">Jobs</li>
        </ul>
      </nav>
    </div>
    <div>
      <ul>
        <li className="hover:bg-blue-600 p-2 rounded">Homepage</li>
        <li className="hover:bg-blue-600 p-2 rounded">More</li>
      </ul>
    </div>
  </motion.aside>
);

const Post = ({ username, description, image }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-semibold">{username}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <img src={image} alt="Post" className="w-full mt-2 rounded-lg" />
      <div className="flex justify-between mt-4 text-gray-500">
        <button onClick={() => setLiked(!liked)}>
          <FaHeart className={liked ? "text-red-500" : ""} />
        </button>
        <FaComment />
        <FaShare />
        <FaBookmark />
      </div>
    </motion.div>
  );
};

const posts = [
  {
    username: "Daniel Rivers",
    description: "Exciting UI/UX insights!",
    image: "https://via.placeholder.com/300",
  },
  {
    username: "Anna Smith",
    description: "Design inspiration for everyone!",
    image: "https://via.placeholder.com/300",
  },
  {
    username: "John Doe",
    description: "Exploring new trends.",
    image: "https://via.placeholder.com/300",
  },
  {
    username: "Emily Clark",
    description: "Creative design ideas!",
    image: "https://via.placeholder.com/300",
  },
];

const RightSidebar = () => (
  <motion.aside
    className="w-64 bg-white p-6 fixed right-0 top-0 h-screen shadow-lg"
    initial={{ x: 100 }}
    animate={{ x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-lg font-semibold">New Contacts</h2>
    <ul className="mt-4">
      <li className="flex justify-between p-2 border-b">
        <span>Vladimir Smirnoff</span>
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Follow
        </button>
      </li>
      <li className="flex justify-between p-2 border-b">
        <span>Lusy Steiner</span>
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Follow
        </button>
      </li>
    </ul>
  </motion.aside>
);

export default function HomePage() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 mr-64 p-6">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </main>
      <RightSidebar />
    </div>
  );
}
