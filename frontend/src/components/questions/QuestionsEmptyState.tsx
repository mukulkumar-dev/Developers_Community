import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const QuestionsEmptyState = () => {
  return (
    <Card className="w-full border-border shadow-md p-8 text-center">
      <CardContent className="pt-6 flex flex-col items-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg mb-2 text-foreground">No questions found</h3>
        <p className="text-muted-foreground mb-6">Be the first to ask a question!</p>
        <Link to="/questions/create">
          <Button>Ask a Question</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuestionsEmptyState;