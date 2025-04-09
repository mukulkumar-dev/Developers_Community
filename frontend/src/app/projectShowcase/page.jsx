"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import Header from "@/components/Header";
import useProjectStore from "@/store/useProjectStore";

const ProjectShowcase = () => {
  const { projects, loading, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <Header />

      {/* Top Wave Background Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white pt-20 pb-32 overflow-hidden w-full">
        <div className="max-w-4xl mx-auto text-center px-4 py-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 ">
            Project Showcase
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-6">
            Discover amazing developer projects built with passion and
            creativity.
          </p>
          <Link
            href="/createProject"
            className="inline-block mt-4 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            + Create Project
          </Link>
        </div>

        {/* Full Width Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="w-[100vw] h-[100px] block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,160L60,144C120,128,240,96,360,96C480,96,600,128,720,149.3C840,171,960,181,1080,160C1200,139,1320,85,1380,58.7L1440,32V320H0Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Upward Wave for Card Background */}
      {/* <div className="relative -mt-1 overflow-hidden w-full">
        <svg
          className="w-[100vw] h-[100px] block rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,224L60,192C120,160,240,96,360,101.3C480,107,600,181,720,197.3C840,213,960,171,1080,154.7C1200,139,1320,149,1380,154.7L1440,160V0H0Z"
          ></path>
        </svg>
      </div> */}

      {/* Project Cards Section */}
      <section className="bg-white relative z-10 px-6 py-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {loading
      ? Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-3xl animate-pulse h-[450px]"
          >
            <div className="h-52 bg-gray-300 rounded-t-3xl"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex gap-2 mt-3">
                <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))
      : projects.map((project, index) => (
          <Link key={project._id} href={`/projectShowcase/${project._id}`}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden h-[450px] flex flex-col"
            >
              {/* Image Section */}
              <div className="h-52 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    project.images?.[0] ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
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
                </div>

                <div>
                  <div className="text-sm text-gray-500">
                    Created by:{" "}
                    <span className="text-blue-700 font-medium">
                      {project.creator?.email || "Unknown"}
                    </span>
                  </div>

                  {project.githubRepo && (
                    <div className="mt-2">
                      <Link
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        🔗 GitHub Repo
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
  </div>
</section>


      {/* Bottom Full-Width Wave */}
      <div className="relative -mt-1 overflow-hidden w-full">
        <svg
          className="w-[100vw] h-[100px] block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f1f5f9"
            d="M0,224L60,192C120,160,240,96,360,101.3C480,107,600,181,720,197.3C840,213,960,171,1080,154.7C1200,139,1320,149,1380,154.7L1440,160V320H0Z"
          ></path>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-gray-600 text-sm w-full">
        © {new Date().getFullYear()} Project Showcase. All rights reserved.
      </footer>
    </>
  );
};

export default ProjectShowcase;