export interface Topic {
  id: number;
  title: string;
  message: string;
  solved: boolean;
  created_at: string;
  user: {
    id: number;
    username: string;
  };
  course: {
    id: number;
    name: string;
  };
}
