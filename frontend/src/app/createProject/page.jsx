"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../../services/projectServices";
import { UploadCloud } from "lucide-react";

const CreateProject = () => {
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    category: "Web",
    liveDemo: "",
    githubRepo: "",
    images: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data.isLoggedIn) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          router.push("/signup");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/signup");
      } finally {
        setLoadingPage(false);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);

    const fileReaders = filesArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((base64Images) => {
      setFormData((prev) => ({ ...prev, images: base64Images }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createProject(formData);
      alert("Project created successfully!");
      router.push("/projectShowcase");
    } catch (error) {
      const errorData = error.response?.data;
      const errorMessage =
        typeof errorData === "string"
          ? errorData
          : errorData?.message ||
            errorData?.error ||
            error.message ||
            "Unknown error";
      alert("Failed to create project: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="w-screen h-screen flex bg-white p-6">
      {/* Left Side - Form */}
      <div className="w-[60%] h-full pr-4 overflow-hidden">
        <div className="w-full h-full bg-white shadow-xl rounded-2xl p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            Create Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-1/3 p-3 text-base rounded-lg bg-white/80 shadow-md focus:outline-blue-500"
              />
              <input
                type="text"
                name="techStack"
                placeholder="Tech Stack"
                value={formData.techStack}
                onChange={handleChange}
                className="w-1/3 p-3 text-base rounded-lg bg-white/80 shadow-md"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-1/3 p-3 text-base rounded-lg bg-white/80 shadow-md"
              >
                <option value="Web">Web</option>
                <option value="JAVA">Java</option>
                <option value="AI">AI</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div>

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-4 text-base rounded-lg bg-white/80 shadow-md focus:outline-blue-500"
            />

            <div className="flex gap-4">
              <input
                type="text"
                name="liveDemo"
                placeholder="Live Demo URL"
                value={formData.liveDemo}
                onChange={handleChange}
                className="w-1/2 p-3 text-base rounded-lg bg-white/80 shadow-md"
              />
              <input
                type="text"
                name="githubRepo"
                placeholder="GitHub Repo URL"
                value={formData.githubRepo}
                onChange={handleChange}
                className="w-1/2 p-3 text-base rounded-lg bg-white/80 shadow-md"
              />
            </div>

            <label className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-blue-400 cursor-pointer bg-white/80 hover:bg-white/90">
              <UploadCloud className="w-8 h-8 mb-2 text-blue-600" />
              <p className="text-sm">Upload Images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white text-base py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {submitting ? "Submitting..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="w-[40%] h-full pl-4 ">
        <div className="w-full h-full backdrop-blur-lg bg-gray-500/40 rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Live Preview
          </h2>
          <div className="rounded-xl overflow-hidden bg-white/60">
            {files.length > 0 ? (
              <img
                src={URL.createObjectURL(files[0])}
                alt="project"
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-500">
                No Image Uploaded
              </div>
            )}

            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {(formData.techStack
                  ? formData.techStack.split(",")
                  : ["React", "Node"]
                ).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {formData.title || "Project Title"}
              </h3>

              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {formData.description ||
                  "This is a short description of the project to show in preview."}
              </p>

              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <strong>Category:</strong> {formData.category || "Web"}
                </p>
                <div className="flex gap-4 mt-2 text-blue-600">
                  {formData.liveDemo ? (
                    <a
                      href={formData.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      🔗 Live Demo
                    </a>
                  ) : (
                    <span className="text-gray-400">No Live Demo</span>
                  )}
                  {formData.githubRepo ? (
                    <a
                      href={formData.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      🐙 GitHub
                    </a>
                  ) : (
                    <span className="text-gray-400">No GitHub</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                    {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
                  </div>
                  <span>{user?.name || user?.email || "User"}</span>
                </div>
                <div className="flex gap-4 text-lg">
                  <span className="hover:text-red-500">❤️</span>
                  <span className="hover:text-blue-500">💬</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
