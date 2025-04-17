"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useDiscussionStore from "@/store/useAuthDiscussion";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Header from "@/components/Header";
import axios from "axios";

export default function DiscussionShowcase() {
  const { getAllDiscussions, discussions, loading, error, likeDiscussion } =
    useDiscussionStore();

  const [showCommentBox, setShowCommentBox] = useState({});
  const [commentText, setCommentText] = useState({});
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    getAllDiscussions();
  }, []);

  const handleLike = async (id) => {
    await likeDiscussion(id);
  };

  const handleToggleCommentBox = (id) => {
    setShowCommentBox((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentChange = (id, value) => {
    setCommentText((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitComment = async (discussionId) => {
    if (!commentText[discussionId]) return;

    try {
      setCommentSubmitting(true);
      await axios.post(`/api/discussion/comment/${discussionId}`, {
        text: commentText[discussionId],
      });

      await getAllDiscussions();
      setCommentText((prev) => ({ ...prev, [discussionId]: "" }));
      setShowCommentBox((prev) => ({ ...prev, [discussionId]: false }));
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 relative">
        {/* Top Wave Section */}
        <div className="relative bg-blue-600 text-white pb-20 mt-16">
          <svg
            className="absolute bottom-0 left-0 w-full h-28"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#f9fafb"
              d="M0,192L80,186.7C160,181,320,171,480,176C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L0,320Z"
            />
          </svg>
          <div className="relative text-center p-10 z-10">
            <h1 className="text-4xl font-bold">Fuel Developer Ideas 💡</h1>
            <p className="mt-2 text-lg max-w-xl mx-auto">
              “Code is like humor. When you have to explain it, it’s bad.” –
              Cory House
            </p>
            <Link
              href="/createDiscussion"
              className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              🚀 Start a Discussion
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pt-10 pb-20">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Latest Developer Discussions
            </h2>

            {loading && (
              <p className="text-center text-blue-600">
                Loading discussions...
              </p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 relative"
                >
                  {/* Username */}
                  <div className="absolute top-4 right-4 text-xs text-gray-400">
                    @{discussion.author?.username || "anonymous"}
                  </div>

                  <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    {discussion.title}
                  </h2>
                  <p className="text-gray-700 line-clamp-3 mb-3">
                    {discussion.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {discussion.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {discussion.author?.profilePic && (
                      <img
                        src={discussion.author.profilePic}
                        alt="Author"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span>{discussion.author?.fullName || "Unknown User"}</span>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(discussion.createdAt).toLocaleString()}
                  </p>

                  {/* Like Button */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 cursor-pointer select-none">
                    <button
                      onClick={() => handleLike(discussion._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      {discussion.userLiked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <span className="text-sm text-gray-600">
                      {discussion.likes}
                    </span>{" "}
                    {/* ✅ Add this */}
                  </div>

                  {/* Comment Toggle & Form */}
                  <div className="mt-4">
                    <button
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-all duration-200"
                      onClick={() => handleToggleCommentBox(discussion._id)}
                    >
                      {showCommentBox[discussion._id]
                        ? "Cancel"
                        : "💬 Add Comment"}
                    </button>

                    {showCommentBox[discussion._id] && (
                      <div className="mt-4 space-y-4">
                        <div className="relative">
                          <textarea
                            className="w-full p-4 border-2 text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            rows={4}
                            placeholder="Write your comment..."
                            value={commentText[discussion._id] || ""}
                            onChange={(e) =>
                              handleCommentChange(
                                discussion._id,
                                e.target.value
                              )
                            }
                          />
                          {/* Character Limit */}
                          <span className="absolute bottom-1 right-3 text-xs text-gray-500">
                            {commentText[discussion._id]?.length || 0} / 500
                          </span>
                        </div>

                        <button
                          className="self-end px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
                          onClick={() => handleSubmitComment(discussion._id)}
                          disabled={commentSubmitting}
                        >
                          {commentSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="relative -mt-2 overflow-hidden w-full">
          <svg
            className="w-full h-24 block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#f1f5f9"
              d="M0,224L60,192C120,160,240,96,360,101.3C480,107,600,181,720,197.3C840,213,960,171,1080,154.7C1200,139,1320,149,1380,154.7L1440,160V320H0Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
