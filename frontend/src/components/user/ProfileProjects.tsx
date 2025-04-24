import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/projects/ProjectCard";
import { userAPI } from "../../../api";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ProfileProjectsProps {
  userId: string;
}

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  difficulty: string;
  githubLink?: string;
  liveLink?: string;
  createdBy: {
    _id: string;
    name: string;
    avatar?: string;
  };
  likes: string[];
  tags: string[];
  createdAt: string;
  comments: any[];
}

const ProfileProjects = ({ userId }: ProfileProjectsProps) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId, page]);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await userAPI.getUserProjects(userId, { page, limit: 6 });
      if (page === 1) {
        setProjects(res.data.projects || []);
      } else {
        setProjects(prev => [...prev, ...(res.data.projects || [])]);
      }
      setHasMore(res.data.currentPage < res.data.totalPages);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>My Projects</CardTitle>
          <Link to="/projects/create">
            <Button size="sm" className="bg-gradient-to-r from-devblue-500 to-devblue-600 hover:from-devblue-600 hover:to-devblue-700">
              <Plus size={16} className="mr-1" />
              New Project
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">Error Loading Projects</h3>
            <p className="text-devgray-500 mt-1">{error}</p>
            <Button onClick={() => fetchProjects()} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>My Projects</CardTitle>
        <Link to="/projects/create">
          <Button size="sm" className="bg-gradient-to-r from-devblue-500 to-devblue-600 hover:from-devblue-600 hover:to-devblue-700">
            <Plus size={16} className="mr-1" />
            New Project
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, index) => (
              <Card key={index} className="h-48 animate-pulse bg-devgray-100 dark:bg-devgray-800" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">No projects yet</h3>
            <p className="text-devgray-500 mt-1">Create your first project to showcase your work</p>
            <Link to="/projects/create" className="mt-4 inline-block">
              <Button>
                <Plus size={16} className="mr-1" />
                Create Project
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  _id={project._id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  techStack={project.techStack}
                  createdBy={{
                    id: project.createdBy._id,
                    name: project.createdBy.name,
                    avatar: project.createdBy.avatar
                  }}
                  createdAt={project.createdAt}
                  likes={project.likes.length}
                  comments={project.comments.length}
                />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileProjects;