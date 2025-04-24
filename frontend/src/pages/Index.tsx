import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import ProjectCard from "@/components/projects/ProjectCard";
import BlogCard from "@/components/blogs/BlogCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Github, ExternalLink } from "lucide-react";
import { useHomeData } from "@/hooks/useHomeData";
import { Card } from "@/components/ui/card";

const Index = () => {
  const { projects, blogs, isLoading } = useHomeData();
  
  // Developer team data
  const developers = [
    {
      id: 1,
      name: "MUKUL KUMAR",
      role: "Full-Stack Developer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B7HkT_vVpF4GwGAfPqHj8w7xmAEMixCHng&s",
      github: "https://github.com/mukulkumar-dev",
      portfolio: "https://mk-portfolio-dev.vercel.app",
      description: "Passionate about React and modern JavaScript frameworks."
    },
    {
      id: 2,
      name: "AKASH KUMAR",
      role: "Full-Stack Developer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B7HkT_vVpF4GwGAfPqHj8w7xmAEMixCHng&s",
      github: "https://github.com/akash-dev-23",
      portfolio: "https://mariarodriguez.design",
      description: "Creating beautiful interfaces with attention to detail and accessibility."
    },
    {
      id: 3,
      name: "MANISH KUMAR",
      role: "Full-Stack Developer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B7HkT_vVpF4GwGAfPqHj8w7xmAEMixCHng&s",
      github: "https://github.com/ManishKumarCs",
      portfolio: "https://manishdev-my-portfolio.vercel.app",
      description: "Specializing in Node.js, MongoDB, and API architecture."
    },
    {
      id: 4,
      name: "RISHABH SINGH",
      role: "Full-Stack Developer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B7HkT_vVpF4GwGAfPqHj8w7xmAEMixCHng&s",
      github: "https://github.com/rishabhcs22",
      portfolio: "https://priyapatel.io",
      description: "Infrastructure automation expert with focus on CI/CD pipelines."
    }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Connect, Collaborate, and Build with Developers"
        subtitle="Share your projects, write technical blogs, ask questions, and join a community of passionate developers."
        ctaText="Get Started"
        ctaLink="/signup"
        secondaryCtaText="Explore Projects"
        secondaryCtaLink="/projects"
      />

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-devgray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-devgray-900 dark:text-white mb-4">
              Everything You Need to Grow as a Developer
            </h2>
            <p className="text-xl text-devgray-600 dark:text-devgray-400 max-w-3xl mx-auto">
              Our platform provides all the tools you need to showcase your work, learn from others, and expand your network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-devgray-50 dark:bg-devgray-800 rounded-lg">
              <div className="w-12 h-12 bg-devblue-100 dark:bg-devblue-900 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-devblue-600 dark:text-devblue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-2">
                Showcase Projects
              </h3>
              <p className="text-devgray-600 dark:text-devgray-400">
                Display your best work with detailed project pages including code, live demos, and technical details.
              </p>
            </div>

            <div className="p-6 bg-devgray-50 dark:bg-devgray-800 rounded-lg">
              <div className="w-12 h-12 bg-devpurple-100 dark:bg-devpurple-900 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-devpurple-600 dark:text-devpurple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-2">
                Write Technical Blogs
              </h3>
              <p className="text-devgray-600 dark:text-devgray-400">
                Share your knowledge and insights with our developer-friendly markdown editor.
              </p>
            </div>

            <div className="p-6 bg-devgray-50 dark:bg-devgray-800 rounded-lg">
              <div className="w-12 h-12 bg-devblue-100 dark:bg-devblue-900 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-devblue-600 dark:text-devblue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-2">
                Q&A Forum
              </h3>
              <p className="text-devgray-600 dark:text-devgray-400">
                Ask questions, get answers, and help others in our community-driven knowledge base.
              </p>
            </div>

            <div className="p-6 bg-devgray-50 dark:bg-devgray-800 rounded-lg">
              <div className="w-12 h-12 bg-devpurple-100 dark:bg-devpurple-900 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-devpurple-600 dark:text-devpurple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-2">
                Developer Events
              </h3>
              <p className="text-devgray-600 dark:text-devgray-400">
                Join virtual and in-person meetups, hackathons, and workshops with fellow developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-devgray-50 dark:bg-devgray-900 border-t border-devgray-100 dark:border-devgray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-devgray-900 dark:text-white mb-2">
                Featured Projects
              </h2>
              <p className="text-lg text-devgray-600 dark:text-devgray-400">
                Discover innovative projects from our community
              </p>
            </div>
            <Link 
              to="/projects"
              className="mt-4 md:mt-0 inline-flex items-center text-devblue-600 dark:text-devblue-400 font-medium hover:text-devblue-700 dark:hover:text-devblue-300"
            >
              View all projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="h-96 animate-pulse" />
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard 
                  key={project._id}
                  id={project._id}
                  {...project}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">No projects yet</h3>
              <p className="text-devgray-500 mt-1">Be the first to share a project!</p>
              <Link to="/projects/create" className="mt-4 inline-block">
                <Button>
                  <Plus size={16} className="mr-1" />
                  Create Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-white dark:bg-devgray-900 border-t border-devgray-100 dark:border-devgray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-devgray-900 dark:text-white mb-2">
                Latest Blog Posts
              </h2>
              <p className="text-lg text-devgray-600 dark:text-devgray-400">
                Insights, tutorials, and tech discussions from our community
              </p>
            </div>
            <Link 
              to="/blogs"
              className="mt-4 md:mt-0 inline-flex items-center text-devblue-600 dark:text-devblue-400 font-medium hover:text-devblue-700 dark:hover:text-devblue-300"
            >
              View all blogs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((n) => (
                <Card key={n} className="h-64 animate-pulse" />
              ))}
            </div>
          ) : blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} {...blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">No blogs yet</h3>
              <p className="text-devgray-500 mt-1">Share your knowledge with the community</p>
              <Link to="/blogs/create" className="mt-4 inline-block">
                <Button>
                  <Plus size={16} className="mr-1" />
                  Write a Blog
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-devblue-600 to-devpurple-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Connect with like-minded developers, showcase your projects, and accelerate your growth as a developer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-devblue-700 hover:bg-devgray-100 font-medium rounded-md transition-colors duration-300"
            >
              Create Account
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-300"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Developer Team Section */}
      <section className="py-16 bg-white dark:bg-devgray-900 border-t border-devgray-100 dark:border-devgray-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-devgray-900 dark:text-white mb-4 animate-fade-in">
              Meet the Team
            </h2>
            <p className="text-xl text-devgray-600 dark:text-devgray-400 max-w-3xl mx-auto animate-fade-in">
              The talented developers behind this platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <div 
                key={dev.id}
                className="bg-devgray-50 dark:bg-devgray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative pb-[100%] overflow-hidden">
                  <img 
                    src={dev.image} 
                    alt={dev.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-devgray-900 dark:text-white mb-1">
                    {dev.name}
                  </h3>
                  <p className="text-devpurple-600 dark:text-devpurple-400 font-medium mb-3">
                    {dev.role}
                  </p>
                  <p className="text-devgray-600 dark:text-devgray-400 mb-4">
                    {dev.description}
                  </p>
                  <div className="flex justify-between">
                    <a 
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-devgray-700 dark:text-devgray-300 hover:text-devblue-600 dark:hover:text-devblue-400 transition-colors duration-300"
                    >
                      <Github size={18} className="mr-1" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href={dev.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-devgray-700 dark:text-devgray-300 hover:text-devblue-600 dark:hover:text-devblue-400 transition-colors duration-300"
                    >
                      <span>Portfolio</span>
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Add these CSS animations to your global styles or component
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}
`;

export default Index;