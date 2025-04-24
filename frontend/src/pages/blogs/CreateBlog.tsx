
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { blogAPI } from '../../../api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { toast } from '@/hooks/use-toast';

type BlogFormData = {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  coverImage?: string;
};

const CreateBlog = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<BlogFormData>();

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsSubmitting(true);
      const formData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim())
      };
      
      await blogAPI.createBlog(formData);
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      navigate('/blogs');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              {...register("excerpt", { required: "Excerpt is required" })}
              placeholder="Brief description of your blog"
            />
            {errors.excerpt && (
              <p className="text-sm text-red-500">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...register("content", { required: "Content is required" })}
              placeholder="Write your blog content here..."
              className="min-h-[200px]"
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
            <Input
              id="coverImage"
              {...register("coverImage")}
              placeholder="Enter cover image URL"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Blog Post"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateBlog;
