
import { Card } from "@/components/ui/card";

const QuestionsLoadingState = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, idx) => (
        <Card key={idx} className="w-full border-border shadow-sm animate-pulse p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </Card>
      ))}
    </div>
  );
};

export default QuestionsLoadingState;
