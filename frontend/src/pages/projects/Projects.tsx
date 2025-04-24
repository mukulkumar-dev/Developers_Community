// src/pages/Projects.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/projects/ProjectCard";
import SearchBar from "@/components/common/SearchBar";
import FilterTags from "@/components/common/FilterTags";
import { projectAPI } from "../../../api";

const allTags = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Django", "Flask",
  "Express", "MongoDB", "PostgreSQL", "AWS", "Docker", "Machine Learning",
  "AI", "Web Development", "Mobile App", "Desktop App", "Game Dev", "Blockchain",
  "API", "Frontend", "Backend", "Full Stack", "DevOps"
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projects, setProjects] = useState([]);
  const [originalProjects, setOriginalProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects();

      // 👇 If API returns { success: true, projects: [...] }
      const fetchedProjects = response.data.projects || response.data;

      setProjects(fetchedProjects);
      setOriginalProjects(fetchedProjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProjects(query, selectedTags);
  };

  const handleTagSelect = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    filterProjects(searchQuery, updatedTags);
  };

  const filterProjects = (query: string, tags: string[]) => {
    let filtered = [...originalProjects];

    if (query) {
      filtered = filtered.filter(
        (project) =>
          project.title?.toLowerCase().includes(query.toLowerCase()) ||
          project.description?.toLowerCase().includes(query.toLowerCase()) ||
          project.techStack?.some((tech) =>
            tech.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (tags.length > 0) {
      filtered = filtered.filter((project) =>
        tags.some((tag) =>
          project.tags?.includes(tag) || project.techStack?.includes(tag)
        )
      );
    }

    setProjects(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setProjects(originalProjects);
  };

  return (
    <Layout>
      <section className="bg-gradient-to-r from-devblue-700 to-devpurple-700 py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Developer Projects
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Discover innovative projects from our community, learn from source code, and get inspired for your next build.
              </p>
            </div>
            <Link
              to="/projects/create"
              className="px-6 py-3 bg-white text-devblue-700 hover:bg-devgray-100 font-medium rounded-md transition-colors duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Submit Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-devgray-900 py-8 border-b border-devgray-200 dark:border-devgray-800">
        <div className="container-custom">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search projects by name, description, or tech stack"
          />
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="w-full md:w-3/4">
              <FilterTags
                tags={allTags}
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
              />
            </div>
            <div className="w-full md:w-1/4 flex justify-end">
              {(searchQuery || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-devgray-600 dark:text-devgray-400 hover:text-devblue-600 dark:hover:text-devblue-400 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="bg-devgray-50 dark:bg-devgray-900 py-16">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-lg text-devgray-500">Loading projects...</p>
          ) : projects.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-devgray-600 dark:text-devgray-400">
                  Showing <span className="font-medium text-devgray-900 dark:text-white">{projects.length}</span> projects
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project._id} id={project._id} {...project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-devgray-600 dark:text-devgray-400 max-w-md mx-auto mb-6">
                We couldn't find any projects that match your search criteria.
              </p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
