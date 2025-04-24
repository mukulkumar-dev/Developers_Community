
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp, Eye, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/question";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { _id, title, tags, createdBy, upvotes, answers, views, createdAt } = question;
  
  // Check if any answer is accepted
  const hasAcceptedAnswer = answers.some(answer => answer.isAccepted);
  
  return (
    <Link to={`/questions/${_id}`}>
      <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
              {title}
            </h3>
            
            {hasAcceptedAnswer && (
              <div className="flex items-center text-green-500 ml-2">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                <span className="text-xs">Solved</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-sm">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={createdBy.avatar} alt={createdBy.name} />
                <AvatarFallback>{createdBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                {createdBy.name} • {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{upvotes.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{answers.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{views}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuestionCard;
