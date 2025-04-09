"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import withAuth from "@/components/withAuth"; // adjust the path as needed

const ProjectDetails = () => {
  const params = useParams();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/${id}`,
          {
            withCredentials: true,
          }
        );
        setProject(res.data);
      } catch (err) {
        console.error("❌ Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!project)
    return <p className="text-center mt-10 text-red-500">Project not found.</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-16 bg-white shadow-2xl rounded-3xl mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {project.images?.[0] && (
        <div className="w-full h-64 relative overflow-hidden rounded-xl mb-6">
          <img
  src={project.images[0]}
  alt="Project Screenshot"
  className="object-cover w-full h-64"
/>

        </div>
      )}

      <h1 className="text-4xl font-bold text-blue-900 mb-2">{project.title}</h1>
      <p className="text-sm text-gray-600 mb-4">Category: {project.category}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Array.isArray(project.techStack)
          ? project.techStack
          : typeof project.techStack === "string"
          ? project.techStack.split(",")
          : []
        ).map((tech, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tech.trim()}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Created by:{" "}
        <span className="text-blue-700 font-semibold">
          {project.creator?.username || project.creator?.email || "Anonymous"}
        </span>
      </p>

      <motion.p
        className="text-gray-800 leading-relaxed mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {project.description}
      </motion.p>

      <div className="flex flex-wrap gap-4 mt-6">
        {project.deployLink && (
          <Link
            href={project.deployLink}
            target="_blank"
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
          >
            🌐 Live Demo
          </Link>
        )}
        {project.githubRepo && (
          <Link
            href={project.githubRepo}
            target="_blank"
            className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-900 transition"
          >
            🛠️ GitHub Repo
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default withAuth(ProjectDetails);
