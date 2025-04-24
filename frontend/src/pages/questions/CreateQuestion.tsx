
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionAPI } from "../../../api";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

// Define the shape of the API response
interface QuestionResponse {
  success: boolean;
  question: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    createdBy: string;
    upvotes: string[];
    answers: any[];
    views: number;
    createdAt: string;
  };
}

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(150, "Title cannot exceed 150 characters"),
  content: z.string().min(30, "Question details must be at least 30 characters"),
  tags: z.array(z.string()).min(1, "Add at least one tag").max(5, "Maximum 5 tags allowed")
});

type FormValues = z.infer<typeof formSchema>;

const CreateQuestion = () => {
  const navigate = useNavigate();
  const [inputTag, setInputTag] = useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: []
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => questionAPI.createQuestion(data),
    onSuccess: (response: { data: QuestionResponse }) => {
      toast.success("Question posted successfully");
      if (response?.data?.question?._id) {
        navigate(`/questions/${response.data.question._id}`);
      } else {
        navigate('/questions');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to post question");
    }
  });
  
  const onSubmit = (data: FormValues) => {
    mutate(data);
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim()) {
      e.preventDefault();
      const currentTags = form.getValues("tags");
      
      if (currentTags.includes(inputTag.trim())) {
        return;
      }
      
      if (currentTags.length >= 5) {
        form.setError("tags", { message: "Maximum 5 tags allowed" });
        return;
      }
      
      form.setValue("tags", [...currentTags, inputTag.trim()]);
      form.clearErrors("tags");
      setInputTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Ask a Question</h1>
          <p className="text-muted-foreground mt-2">
            Get help from the developer community by asking a clear, well-detailed question
          </p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. How to implement authentication in React?" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide details about your question. Include code samples, error messages, and what you've tried so far." 
                        className="min-h-[200px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          placeholder="Add tags (e.g. javascript, react) and press Enter"
                          value={inputTag}
                          onChange={(e) => setInputTag(e.target.value)}
                          onKeyDown={handleAddTag}
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((tag) => (
                            <Badge key={tag} className="py-1.5 px-3">
                              {tag}
                              <button 
                                type="button" 
                                className="ml-2" 
                                onClick={() => removeTag(tag)}
                              >
                                <X size={14} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/questions")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Posting..." : "Post Question"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateQuestion;
