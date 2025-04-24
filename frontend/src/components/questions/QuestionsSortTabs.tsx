import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuestionsSortTabsProps {
  onSortChange: (value: string) => void;
}

const QuestionsSortTabs = ({ onSortChange }: QuestionsSortTabsProps) => {
  return (
    <Card className="mb-6 border-border shadow-sm overflow-hidden">
      <CardContent className="pt-4">
        <Tabs defaultValue="newest" className="w-full" onValueChange={onSortChange}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="upvotes">Most Voted</TabsTrigger>
            <TabsTrigger value="views">Most Viewed</TabsTrigger>
            <TabsTrigger value="answers">Most Answers</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuestionsSortTabs;