
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionAPI } from "../../../api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ThumbsUp, MessageCircle, Check, Loader2 } from "lucide-react";

// Define the Answer type
interface Answer {
  _id: string;
  content: string;
  createdBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  upvotes: string[];
  isAccepted: boolean;
  createdAt: string;
}

// Define the DetailedQuestion type
interface DetailedQuestion {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdBy: {
    _id: string;
    name: string;
    avatar: string;
    bio?: string;
  };
  upvotes: any[];
  answers: Answer[];
  views: number;
  createdAt: string;
}

// Define the API response type
interface QuestionDetailResponse {
  success: boolean;
  question: DetailedQuestion;
}

// Define the answer form schema
const answerSchema = z.object({
  content: z.string().min(30, "Answer must be at least 30 characters")
});

type AnswerFormValues = z.infer<typeof answerSchema>;

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // Get user ID from local storage (you'll need to implement proper auth)
  useState(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setCurrentUserId(parsedUser._id);
      }
    } catch (error) {
      console.error("Error getting user from local storage:", error);
    }
  });
  
  // Form for submitting answers
  const form = useForm<AnswerFormValues>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: ""
    }
  });

  // Fetch question details
  const { data, isLoading, error } = useQuery<QuestionDetailResponse>({
    queryKey: ["question", id],
    queryFn: () => {
      if (!id) throw new Error("Question ID is required");
      return questionAPI.getQuestionById(id).then(response => response.data);
    },
    enabled: !!id
  });

  // Upvote question mutation
  const { mutate: upvoteQuestion } = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("Question ID is required");
      return questionAPI.upvoteQuestion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", id] });
      toast.success("Vote updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update vote");
    }
  });

  // Accept answer mutation
  const { mutate: acceptAnswer, isPending: isAccepting } = useMutation({
    mutationFn: (answerId: string) => {
      if (!id) throw new Error("Question ID is required");
      return questionAPI.acceptAnswer(id, answerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", id] });
      toast.success("Answer accepted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to accept answer");
    }
  });

  // Upvote answer mutation
  const { mutate: upvoteAnswer } = useMutation({
    mutationFn: (answerId: string) => {
      if (!id) throw new Error("Question ID is required");
      return questionAPI.upvoteAnswer(id, answerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", id] });
      toast.success("Vote updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update vote");
    }
  });

  // Add answer mutation
  const { mutate: addAnswer, isPending: isSubmittingAnswer } = useMutation({
    mutationFn: (data: AnswerFormValues) => {
      if (!id) throw new Error("Question ID is required");
      return questionAPI.addAnswer(id, data.content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", id] });
      toast.success("Your answer has been posted");
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to post answer");
    }
  });

  const onSubmit = (data: AnswerFormValues) => {
    addAnswer(data);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <Card className="w-full border-border shadow-sm mb-6">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <Card className="w-full border-border shadow-md p-8 text-center">
            <CardContent className="pt-6 flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                Error loading question
              </h3>
              <p className="text-muted-foreground mb-6">
                The question may have been removed or you may have followed a broken link.
              </p>
              <Button onClick={() => navigate("/questions")}>
                Return to Questions
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const question = data.question;
  const isQuestionAuthor = currentUserId === question.createdBy._id;
  const hasVotedQuestion = question.upvotes.some(upvote => upvote._id === currentUserId);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-grow" />
          <Link to="/questions/create">
            <Button>Ask Question</Button>
          </Link>
        </div>
        
        {/* Question Section */}
        <Card className="w-full border-border shadow-sm mb-6">
          <CardHeader className="pb-0">
            <h1 className="text-2xl font-bold">{question.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2">
              <span>Asked {format(new Date(question.createdAt), 'MMM d, yyyy')}</span>
              <span>•</span>
              <span>Viewed {question.views} times</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Vote Column */}
              <div className="flex md:flex-col items-center md:w-16">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`${hasVotedQuestion ? 'text-primary' : ''}`} 
                  onClick={() => upvoteQuestion()}
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <span className="mx-2 md:mx-0 md:my-2 font-semibold">
                  {question.upvotes.length}
                </span>
                <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                  <span>votes</span>
                </div>
              </div>
              
              {/* Question Content */}
              <div className="flex-grow">
                <div className="prose max-w-none dark:prose-invert prose-pre:bg-muted prose-pre:text-muted-foreground">
                  <p className="whitespace-pre-wrap">{question.content}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-end mt-6">
                  <div className="flex items-center bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mr-2">
                      asked by
                    </div>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={question.createdBy.avatar} alt={question.createdBy.name} />
                      <AvatarFallback>{question.createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">
                      {question.createdBy.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Answers Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          
          {question.answers.length > 0 ? (
            <div className="space-y-6">
              {question.answers.map((answer) => {
                const hasVotedAnswer = answer.upvotes.some((upvote: any) => upvote._id === currentUserId);
                
                return (
                  <Card 
                    key={answer._id} 
                    className={`border-border shadow-sm ${answer.isAccepted ? 'border-l-4 border-l-green-500' : ''}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Vote Column */}
                        <div className="flex md:flex-col items-center md:w-16">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className={`${hasVotedAnswer ? 'text-primary' : ''}`}
                            onClick={() => upvoteAnswer(answer._id)}
                          >
                            <ThumbsUp className="h-5 w-5" />
                          </Button>
                          <span className="mx-2 md:mx-0 md:my-2 font-semibold">
                            {answer.upvotes.length}
                          </span>
                          
                          {isQuestionAuthor && !answer.isAccepted && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2 text-xs"
                              onClick={() => acceptAnswer(answer._id)}
                              disabled={isAccepting}
                            >
                              {isAccepting ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <>Accept</>
                              )}
                            </Button>
                          )}
                          
                          {answer.isAccepted && (
                            <div className="flex items-center gap-1 text-green-500 mt-2">
                              <Check className="h-4 w-4" />
                              <span className="text-xs">Accepted</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Answer Content */}
                        <div className="flex-grow">
                          <div className="prose max-w-none dark:prose-invert prose-pre:bg-muted prose-pre:text-muted-foreground">
                            <p className="whitespace-pre-wrap">{answer.content}</p>
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <div className="flex items-center bg-muted/50 rounded-lg p-3">
                              <div className="text-xs text-muted-foreground mr-2">
                                answered by
                              </div>
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={answer.createdBy.avatar} alt={answer.createdBy.name} />
                                <AvatarFallback>{answer.createdBy.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="text-sm font-medium">
                                {answer.createdBy.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 text-center">
                <MessageCircle className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium mb-1">No answers yet</h3>
                <p className="text-muted-foreground">Be the first to answer this question!</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Add Answer Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Your Answer</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your answer here..." 
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmittingAnswer}>
                  {isSubmittingAnswer ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>Post Your Answer</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <p>
              By posting your answer, you agree to the Developer Community's code of conduct
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default QuestionDetail;
