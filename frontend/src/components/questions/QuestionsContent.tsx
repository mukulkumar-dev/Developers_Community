import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import QuestionCard from "./QuestionCard";
import QuestionsLoadingState from "./QuestionsLoadingState";
import QuestionsEmptyState from "./QuestionsEmptyState";
import QuestionsSortTabs from "./QuestionsSortTabs";
import { Question } from "@/types/question";

interface QuestionsContentProps {
  isLoading: boolean;
  error: Error | null;
  questions?: Question[];
  onSortChange: (value: string) => void;
}

const QuestionsContent = ({ 
  isLoading, 
  error, 
  questions,
  onSortChange 
}: QuestionsContentProps) => {
  if (isLoading) {
    return <QuestionsLoadingState />;
  }

  if (error) {
    return (
      <Card className="w-full border-border shadow-md p-8 text-center">
        <CardContent className="pt-6 flex flex-col items-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2 text-foreground">Error loading questions</h3>
          <p className="text-muted-foreground mb-6">Please try again later</p>
        </CardContent>
      </Card>
    );
  }

  if (!questions?.length) {
    return <QuestionsEmptyState />;
  }

  return (
    <>
      <QuestionsSortTabs onSortChange={onSortChange} />
      <div className="space-y-4">
        {questions.map((question: Question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default QuestionsContent;
