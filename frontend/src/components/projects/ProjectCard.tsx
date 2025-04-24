import { Link } from "react-router-dom";

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  techStack: string[];
  createdBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  tags,
  techStack,
  createdBy,
  createdAt,
  likes,
  comments,
}: ProjectProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card group h-full flex flex-col">
      {/* Project Image */}
      <div className="w-full h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-devblue-100 to-devpurple-200 dark:from-devblue-900 dark:to-devpurple-900 flex items-center justify-center">
            <span className="text-2xl font-mono text-devblue-500 dark:text-devblue-300">{`</>`}</span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap mb-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
          {tags.length > 3 && <span className="tag">+{tags.length - 3}</span>}
        </div>

        {/* Title & Description */}
        <Link to={`/projects/${id}`}>
          <h3 className="text-xl font-semibold mb-2 text-devgray-900 dark:text-white hover:text-devblue-600 dark:hover:text-devblue-400 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-devgray-600 dark:text-devgray-400 mb-4 flex-grow">
          {truncateText(description, 120)}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-devgray-500 dark:text-devgray-400 mb-2">
            Tech Stack
          </h4>
          <div className="flex flex-wrap">
            {techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium bg-devgray-100 text-devgray-800 dark:bg-devgray-800 dark:text-devgray-200 rounded-md mr-1 mb-1"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-devgray-100 text-devgray-800 dark:bg-devgray-800 dark:text-devgray-200 rounded-md">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer with User and Stats */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-devgray-100 dark:border-devgray-800">
          {/* User */}
          <Link
            to={`/profile/${createdBy?.id || ""}`}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-devgray-200 dark:bg-devgray-800 rounded-full overflow-hidden">
              {createdBy?.avatar ? (
                <img
                  src={createdBy.avatar}
                  alt={createdBy.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-devgray-500 font-medium">
                  {createdBy?.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-devgray-800 dark:text-devgray-200">
              {createdBy?.name || "Anonymous"}
            </span>
          </Link>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-xs text-devgray-600 dark:text-devgray-400">
            <span>{formattedDate}</span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
