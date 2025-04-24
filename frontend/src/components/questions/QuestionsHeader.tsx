
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const QuestionsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Developer Q&A</h1>
        <p className="text-muted-foreground mt-2">
          Ask questions, get answers, and help others in the community
        </p>
      </div>
      <Link to="/questions/create">
        <Button className="flex items-center gap-2 bg-gradient-to-r from-devblue-500 to-devblue-600 hover:from-devblue-600 hover:to-devblue-700 shadow-md hover:shadow-lg transition-all duration-200">
          <Plus size={18} />
          Ask Question
        </Button>
      </Link>
    </div>
  );
};

export default QuestionsHeader;
