import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projectAPI } from "../../../api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, Link as LinkIcon, Github, Heart, MessageCircle, User } from "lucide-react";

interface ProjectDetailType {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  techStack: string[];
  createdBy: {
    _id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  createdAt: string;
  likes: string[];
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
    text: string;
    createdAt: string;
  }[];
  difficulty: string;
  githubLink?: string;
  liveLink?: string;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const res = await projectAPI.getProjectById(id);
        setProject(res.data.project);
      } catch (err) {
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchProject();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="animate-pulse h-96 bg-devgray-200 dark:bg-devgray-800 rounded-xl mb-8"></div>
        <div className="h-12 bg-devgray-200 dark:bg-devgray-800 rounded w-2/3 mb-6"></div>
        <div className="h-32 bg-devgray-200 dark:bg-devgray-800 rounded w-full mb-6"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the project you're looking for.</p>
        <Button variant="default" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-devgray-50 dark:bg-devgray-900 py-10">
      <div className="container-custom">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> 
            Back to Projects
          </Button>
        </div>

        <div className="w-full max-h-96 overflow-hidden rounded-xl mb-8 shadow-lg">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="h-96 flex items-center justify-center bg-gradient-to-br from-devblue-100 to-devpurple-200 dark:from-devblue-900 dark:to-devpurple-900">
              <span className="text-4xl font-mono text-devblue-500 dark:text-devblue-300">{`</>`}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-devgray-900 dark:text-white mb-4">{project.title}</h1>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-devgray-200 dark:bg-devgray-700 text-sm font-medium rounded">
                <Calendar className="w-4 h-4 mr-1" /> {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-devgray-200 dark:bg-devgray-700 text-sm font-medium rounded capitalize">
                <Tag className="w-4 h-4 mr-1" /> {project.difficulty}
              </span>
            </div>
            <p className="text-lg text-devgray-700 dark:text-devgray-200 mb-5">{project.description}</p>

            <div className="mb-6">
              <h2 className="font-semibold text-devgray-900 dark:text-white mb-2">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-devgray-100 dark:bg-devgray-800 text-devgray-800 dark:text-devgray-200 rounded">{tech}</span>
                ))}
              </div>
            </div>

            {project.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="font-semibold text-devgray-900 dark:text-white mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-devpurple-100 dark:bg-devpurple-900 text-devpurple-600 dark:text-devpurple-300 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-10">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-devgray-200 dark:bg-devgray-800 rounded text-devgray-900 dark:text-white hover:bg-devgray-300 dark:hover:bg-devgray-700 transition">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-devgray-200 dark:bg-devgray-800 rounded text-devgray-900 dark:text-white hover:bg-devgray-300 dark:hover:bg-devgray-700 transition">
                  <LinkIcon className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>

          <aside className="w-full lg:w-80">
            <Card className="mb-6">
              <CardContent className="py-7 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-devgray-200 dark:bg-devgray-800 overflow-hidden flex items-center justify-center mb-3">
                  {project.createdBy.avatar ? (
                    <img src={project.createdBy.avatar} alt={project.createdBy.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-devgray-400" />
                  )}
                </div>
                <Link to={`/profile/${project.createdBy._id}`} className="text-lg font-semibold text-devgray-900 dark:text-white hover:text-devblue-600 dark:hover:text-devblue-400">{project.createdBy.name}</Link>
                {project.createdBy.bio && (
                  <p className="text-sm text-devgray-600 dark:text-devgray-300 text-center mt-2">{project.createdBy.bio}</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2 text-devgray-700 dark:text-devgray-200">
                  <Heart className="w-5 h-5 text-red-500" /> <span>{project.likes.length}</span>
                </div>
                <div className="flex items-center gap-2 text-devgray-700 dark:text-devgray-200">
                  <MessageCircle className="w-5 h-5" /> <span>{project.comments.length}</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-devgray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Comments
          </h2>
          {project.comments.length === 0 ? (
            <div className="text-devgray-600 dark:text-devgray-400 mb-6">No comments yet.</div>
          ) : (
            <div className="space-y-5">
              {project.comments.map((comment) => (
                <div key={comment._id} className="flex gap-3 items-start bg-white dark:bg-devgray-800 p-4 rounded shadow">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-devgray-200 dark:bg-devgray-700 flex items-center justify-center">
                    {comment.user && comment.user.avatar ? (
                      <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-devgray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-devgray-900 dark:text-white">{comment.user?.name || "Anonymous"}</div>
                    <div className="text-sm text-devgray-500 dark:text-devgray-300">{new Date(comment.createdAt).toLocaleString()}</div>
                    <div className="text-devgray-800 dark:text-devgray-200 mt-1">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;