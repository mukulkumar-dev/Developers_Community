import { useQuery } from "@tanstack/react-query";
import { blogAPI, projectAPI } from "../../api";

export const useHomeData = () => {
  const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: () => projectAPI.getProjects({ limit: 3, sort: "likes" }), // Sort by likes to show popular projects
  });

  const { data: blogsData, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: () => blogAPI.getBlogs({ limit: 2, sort: "-createdAt" }), // Sort by newest first
  });


  return {
    projects: projectsData?.data.projects || [],
    blogs: blogsData?.data.blogs || [],
    isLoading: isLoadingProjects || isLoadingBlogs,
  };
};