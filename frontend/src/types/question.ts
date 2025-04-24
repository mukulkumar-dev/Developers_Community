
export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  upvotes: string[];
  answers: any[];
  views: number;
  createdAt: string;
}
