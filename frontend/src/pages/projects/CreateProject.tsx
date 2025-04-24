
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { projectAPI } from '../../../api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { toast } from '@/hooks/use-toast';

type ProjectFormData = {
  title: string;
  description: string;
  techStack: string;
  tags: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  githubLink?: string;
  liveLink?: string;
  image?: string;
};

const CreateProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      const formData = {
        ...data,
        techStack: data.techStack.split(',').map(tech => tech.trim()),
        tags: data.tags.split(',').map(tag => tag.trim())
      };
      
      await projectAPI.createProject(formData);
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      navigate('/projects');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Describe your project..."
              className="min-h-[150px]"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              {...register("techStack", { required: "Tech stack is required" })}
              placeholder="Enter technologies used, separated by commas"
            />
            {errors.techStack && (
              <p className="text-sm text-red-500">{errors.techStack.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <select
              id="difficulty"
              {...register("difficulty")}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
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
            <Label htmlFor="githubLink">GitHub Link (Optional)</Label>
            <Input
              id="githubLink"
              {...register("githubLink")}
              placeholder="Enter GitHub repository URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveLink">Live Demo Link (Optional)</Label>
            <Input
              id="liveLink"
              {...register("liveLink")}
              placeholder="Enter live demo URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image URL (Optional)</Label>
            <Input
              id="image"
              {...register("image")}
              placeholder="Enter project image URL"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProject;
