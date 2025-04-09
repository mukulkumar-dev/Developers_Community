"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import Header from "@/components/Header";

const API_URL = "http://localhost:5000/api/projects/all";

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(API_URL);
        setProjects(res.data.projects || res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Header />

      {/* Top Blue Wave Section */}
      <section className="relative bg-blue-950 text-white pb-24 pt-40 overflow-hidden mt-16">
        <div className="text-center px-6 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-extrabold mb-8"
          >
            🚀 Explore Awesome Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Dive into the world of creativity and innovation from developers
            across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link href="/createProject">
              <button className="bg-white text-blue-900 font-semibold px-6 py-4 rounded-xl shadow hover:scale-105 transition-transform">
                Create New Project
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="w-full h-[100px] sm:h-[130px]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,160L48,149.3C96,139,192,117,288,106.7C384,96,480,96,576,117.3C672,139,768,181,864,181.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160V320H0Z"
            />
          </svg>
        </div>
      </section>

      {/* Middle Card Section */}
      <section className="bg-white relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Link key={project._id} href={`/projectShowcase/${project._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden"
              >
                <img
                  src={project.images?.[0] || "https://via.placeholder.com/400"}
                  alt={project.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-blue-800">
                      {project.title}
                    </h2>
                    {project.deployLink && (
                      <Link
                        href={project.deployLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiExternalLink size={20} />
                      </Link>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {project.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {(Array.isArray(project.techStack)
                      ? project.techStack
                      : typeof project.techStack === "string"
                      ? project.techStack.split(",")
                      : []
                    ).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500">
                    Created by:{" "}
                    <span className="text-blue-700 font-medium">
                      {project.creator?.email || "Unknown"}
                    </span>
                  </div>

                  {project.githubRepo && (
                    <div className="px-5 pb-5">
                      <Link
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2 text-sm text-indigo-600 hover:underline"
                      >
                        🔗 GitHub Repo
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Blue Wave with Footer */}
      <section className="relative bg-blue-950 text-white mt-[-2px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="w-full h-[100px] sm:h-[130px]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,160L48,149.3C96,139,192,117,288,106.7C384,96,480,96,576,117.3C672,139,768,181,864,181.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160V320H0Z"
            />
          </svg>
        </div>

        <footer className="relative z-10 text-center py-10">
          <p className="text-sm text-white">
            © 2025 DevShowcase. All rights reserved.
          </p>
        </footer>
      </section>
    </>
  );
};

export default ProjectShowcase;
