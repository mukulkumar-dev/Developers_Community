
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SearchBar from "@/components/common/SearchBar";
import FilterTags from "@/components/common/FilterTags";

interface QuestionsSidebarProps {
  onSearch: (term: string) => void;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  tagOptions: string[];
}

const QuestionsSidebar = ({
  onSearch,
  selectedTags,
  onTagSelect,
  tagOptions
}: QuestionsSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="bg-muted/50 pb-3">
          <h3 className="font-semibold text-foreground">Search Questions</h3>
        </CardHeader>
        <CardContent className="pt-4">
          <SearchBar onSearch={onSearch} placeholder="Search questions..." />
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="bg-muted/50 pb-3">
          <h3 className="font-semibold text-foreground">Popular Tags</h3>
        </CardHeader>
        <CardContent className="pt-4">
          <FilterTags 
            options={tagOptions} 
            selectedTags={selectedTags}
            onTagSelect={onTagSelect}
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="bg-muted/50 pb-3">
          <h3 className="font-semibold text-foreground">About</h3>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Our Q&A platform helps developers find solutions to their coding problems and share knowledge with the community.
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-devblue-500"></div>
              <span>Ask specific, focused questions</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-devblue-500"></div>
              <span>Include relevant code or examples</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-devblue-500"></div>
              <span>Tag your question appropriately</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionsSidebar;
