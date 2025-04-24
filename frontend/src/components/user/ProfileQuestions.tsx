import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { userAPI } from "../../../api";
import { Plus, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import QuestionCard from "@/components/questions/QuestionCard";

interface ProfileQuestionsProps {
  userId: string;
}

const ProfileQuestions = ({ userId }: ProfileQuestionsProps) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchQuestions();
    }
  }, [userId, page]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      // This endpoint might need to be created in your backend
      const res = await userAPI.getUserQuestions(userId, { page, limit: 6 });
      if (page === 1) {
        setQuestions(res.data.questions);
      } else {
        setQuestions(prev => [...prev, ...res.data.questions]);
      }
      setHasMore(res.data.currentPage < res.data.totalPages);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>My Questions</CardTitle>
        <Link to="/questions/create">
          <Button size="sm" className="bg-gradient-to-r from-devblue-500 to-devblue-600 hover:from-devblue-600 hover:to-devblue-700">
            <Plus size={16} className="mr-1" />
            New Question
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading && page === 1 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="h-32 animate-pulse bg-devgray-100 dark:bg-devgray-800" />
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-devgray-900 dark:text-devgray-100">No questions yet</h3>
            <p className="text-devgray-500 mt-1">Ask the community for help with your coding challenges</p>
            <Link to="/questions/create" className="mt-4 inline-block">
              <Button>
                <Plus size={16} className="mr-1" />
                Ask a Question
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard key={question._id} question={question} />
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

export default ProfileQuestions;
