import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blogs/BlogCard";
import SearchBar from "@/components/common/SearchBar";
import FilterTags from "@/components/common/FilterTags";
import { Button } from "@/components/ui/button";
import { blogAPI } from "../../../api"; // Assuming blogAPI is a module to handle API requests

// Mock data for tags (same as before)
const allTags = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js", 
  "Python", "Django", "Flask", "DevOps", "Docker", "Kubernetes",
  "AWS", "Azure", "GCP", "Frontend", "Backend", "Full Stack", 
  "Career", "Productivity", "Testing", "Mobile", "Web Development"
];

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [blogs, setBlogs] = useState([]);  // Stores blogs fetched from the API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs from the API when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await blogAPI.getBlogs(); // Assuming this is the function to fetch blogs
        if (response && response.data && response.data.blogs) {
          setBlogs(response.data.blogs); // Extract the blogs array from response
          console.log("Fetched blogs:", response.data.blogs); // Debugging line
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setError("Failed to fetch blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBlogs(query, selectedTags);
  };

  const handleTagSelect = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(updatedTags);
    filterBlogs(searchQuery, updatedTags);
  };

  const filterBlogs = (query: string, tags: string[]) => {
    let filteredBlogs = blogs;

    // Filter by search query
    if (query) {
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by tags
    if (tags.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        tags.some((tag) => blog.tags.includes(tag))
      );
    }

    setBlogs(filteredBlogs);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setBlogs(blogs); // Reset to original blogs list after clearing filters
  };

  return (
    <Layout>
      <section className="bg-gradient-to-r from-devpurple-700 to-devblue-700 py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Developer Blog
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Insights, tutorials, and perspectives from our community of developers. Learn and share knowledge.
              </p>
            </div>
            <Link
              to="/blogs/create"
              className="px-6 py-3 bg-white text-devpurple-700 hover:bg-devgray-100 font-medium rounded-md transition-colors duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-devgray-900 py-8 border-b border-devgray-200 dark:border-devgray-800">
        <div className="container-custom">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search blogs by title or content"
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

      <section className="bg-devgray-50 dark:bg-devgray-900 py-16">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-devgray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p>{error}</p>
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-devgray-600 dark:text-devgray-400">
                  Showing <span className="font-medium text-devgray-900 dark:text-white">{blogs.length}</span> blogs
                </p>
              </div>
              <div className="flex flex-col space-y-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} id={blog._id} {...blog} coverImage={blog.coverImage || "https://via.placeholder.com/150"} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-devgray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-2">
                No blogs found
              </h3>
              <p className="text-devgray-600 dark:text-devgray-400 max-w-md mx-auto mb-6">
                We couldn't find any blogs that match your search criteria. Try adjusting your filters or search query.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
