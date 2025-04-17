"use client";

import { useState } from "react";
import useDiscussionStore from "@/store/useAuthDiscussion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreateDiscussionPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { createDiscussion } = useDiscussionStore(); // ✅ get from zustand store

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");

   try {
     const tagsArray = formData.tags
       .split(",")
       .map((tag) => tag.trim().toLowerCase());

     await createDiscussion({
       title: formData.title,
       description: formData.description,
       tags: tagsArray,
     });

     // ✅ Show alert or set a toast state here
     alert("✅ Discussion created successfully!");
     router.push("/discussionShowcase");
   } catch (err) {
     setError(err.error || "Failed to create discussion");
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Discussion
        </h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 text-black rounded-xl p-2 mt-1"
              maxLength={150}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 text-black rounded-xl p-2 mt-1"
              rows="6"
              maxLength={5000}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 text-black rounded-xl p-2 mt-1"
              placeholder="e.g. react, webdev, javascript"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
          >
            {loading ? "Creating..." : "Create Discussion"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
