import { useQuery } from "@tanstack/react-query";
import { questionAPI } from "../../api";
import { Question } from "@/types/question";

interface UseQuestionsProps {
  searchTerm: string;
  selectedTags: string[];
  sortOption: string;
}

export const useQuestions = ({ searchTerm, selectedTags, sortOption }: UseQuestionsProps) => {
  return useQuery({
    queryKey: ["questions", searchTerm, selectedTags, sortOption],
    queryFn: () => questionAPI.getQuestions({
      search: searchTerm,
      tags: selectedTags.join(','),
      sort: sortOption,
      page: 1,
      limit: 10
    }).then(response => response.data),
  });
};
