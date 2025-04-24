import { useState } from "react";
import Layout from "@/components/layout/Layout";
import QuestionsHeader from "@/components/questions/QuestionsHeader";
import QuestionsContent from "@/components/questions/QuestionsContent";
import QuestionsSidebar from "@/components/questions/QuestionsSidebar";
import { useQuestions } from "@/hooks/useQuestions";

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");

  const tagOptions = [
    "javascript", "react", "nodejs", "typescript", "python",
    "database", "frontend", "backend", "devops", "mobile",
    "cloud", "security", "testing", "performance", "ui/ux"
  ];

  const { data, isLoading, error } = useQuestions({
    searchTerm,
    selectedTags,
    sortOption,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <QuestionsHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <QuestionsSidebar 
            onSearch={handleSearch}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            tagOptions={tagOptions}
          />
          <div className="lg:col-span-3">
            <QuestionsContent
              isLoading={isLoading}
              error={error as Error}
              questions={data?.questions}
              onSortChange={setSortOption}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Questions;