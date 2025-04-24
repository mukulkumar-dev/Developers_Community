import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blogs/BlogCard";
import { userAPI } from "../../../api";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ProfileBlogsProps {
  userId: string;
}

interface BlogType {
  _id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  createdBy: {
    _id: string;
    name: string;
    avatar?: string;
  };
  likes: string[];
  tags: string[];
  readTime: number;
  createdAt: string;
  comments: any[];
}

const ProfileBlogs = ({ userId }: ProfileBlogsProps) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchBlogs();
    }
  }, [userId, page]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await userAPI.getUserBlogs(userId, { page, limit: 6 });
      if (page === 1) {
        setBlogs(res.data.blogs || []);
      } else {
        setBlogs(prev => [...prev, ...(res.data.blogs || [])]);
      }
      setHasMore(res.data.currentPage < res.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again later.");
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>My Blogs</CardTitle>
          <Link to="/blogs/create">
            <Button size="sm" className="bg-gradient-to-r from-devblue-500 to-devblue-600 hover:from-devblue-600 hover:to-devblue-700">
              <Plus size={16} className="mr-1" />
              New Blog
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">Error Loading Blogs</h3>
            <p className="text-devgray-500 mt-1">{error}</p>
            <Button onClick={() => fetchBlogs()} variant="outline" className="mt-4">
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
        <CardTitle>My Blogs</CardTitle>
        <Link to="/blogs/create">
          <Button size="sm" className="bg-gradient-to-r from-devblue-500 to-devblue-600 hover:from-devblue-600 hover:to-devblue-700">
            <Plus size={16} className="mr-1" />
            New Blog
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading && page === 1 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="h-28 animate-pulse bg-devgray-100 dark:bg-devgray-800" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">No blogs yet</h3>
            <p className="text-devgray-500 mt-1">Share your knowledge with the community</p>
            <Link to="/blogs/create" className="mt-4 inline-block">
              <Button>
                <Plus size={16} className="mr-1" />
                Create Blog Post
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <BlogCard 
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  coverImage={blog.coverImage}
                  tags={blog.tags}
                  createdBy={{
                    id: blog.createdBy._id,
                    name: blog.createdBy.name,
                    avatar: blog.createdBy.avatar
                  }}
                  createdAt={blog.createdAt}
                  readTime={blog.readTime}
                  likes={blog.likes.length}
                  comments={blog.comments.length}
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

export default ProfileBlogs;