import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogAPI } from "../../../api";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MessageCircle, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BlogDetailType {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
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
  readTime: number;
}

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await blogAPI.getBlogById(id);
        setBlog(res.data.blog);
      } catch (err) {
        setBlog(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-devgray-200 dark:bg-devgray-800 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-devgray-200 dark:bg-devgray-800 rounded-xl mb-8"></div>
            <div className="h-12 bg-devgray-200 dark:bg-devgray-800 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-devgray-200 dark:bg-devgray-800 rounded w-full mb-4"></div>
            <div className="h-4 bg-devgray-200 dark:bg-devgray-800 rounded w-full mb-4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-bold mb-2">Blog Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the blog post you're looking for.</p>
          <Button variant="default" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <div className="min-h-screen bg-devgray-50 dark:bg-devgray-900 py-10">
        <div className="container-custom">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> 
              Back to Blogs
            </Button>
          </div>

          {blog.coverImage && (
            <div className="w-full max-h-[500px] overflow-hidden rounded-xl mb-8 shadow-lg">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-devgray-900 dark:text-white mb-4">
                {blog.title}
              </h1>
              
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-devgray-200 dark:bg-devgray-700 text-sm font-medium rounded">
                  <Calendar className="w-4 h-4 mr-1" /> {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-devgray-200 dark:bg-devgray-700 text-sm font-medium rounded">
                  {blog.readTime} min read
                </span>
              </div>

              {blog.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-devpurple-100 dark:bg-devpurple-900 text-devpurple-600 dark:text-devpurple-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {blog.content}
              </div>
            </div>

            <aside className="w-full lg:w-80">
              <Card className="mb-6">
                <CardContent className="py-7 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-devgray-200 dark:bg-devgray-800 overflow-hidden mb-3">
                    {blog.createdBy.avatar ? (
                      <img
                        src={blog.createdBy.avatar}
                        alt={blog.createdBy.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-devgray-400">
                        {blog.createdBy.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/profile/${blog.createdBy._id}`}
                    className="text-lg font-semibold text-devgray-900 dark:text-white hover:text-devblue-600 dark:hover:text-devblue-400"
                  >
                    {blog.createdBy.name}
                  </Link>
                  {blog.createdBy.bio && (
                    <p className="text-sm text-devgray-600 dark:text-devgray-300 text-center mt-2">
                      {blog.createdBy.bio}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2 text-devgray-700 dark:text-devgray-200">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>{blog.likes.length}</span>
                  </div>
                  <div className="flex items-center gap-2 text-devgray-700 dark:text-devgray-200">
                    <MessageCircle className="w-5 h-5" />
                    <span>{blog.comments.length}</span>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-semibold text-devgray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Comments
            </h2>
            {blog.comments.length === 0 ? (
              <div className="text-devgray-600 dark:text-devgray-400 mb-6">
                No comments yet.
              </div>
            ) : (
              <div className="space-y-5">
                {blog.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex gap-3 items-start bg-white dark:bg-devgray-800 p-4 rounded shadow"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-devgray-200 dark:bg-devgray-700">
                      {comment.user.avatar ? (
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-devgray-400">
                          {comment.user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-devgray-900 dark:text-white">
                        {comment.user.name}
                      </div>
                      <div className="text-sm text-devgray-500 dark:text-devgray-300">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                      <div className="text-devgray-800 dark:text-devgray-200 mt-1">
                        {comment.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;