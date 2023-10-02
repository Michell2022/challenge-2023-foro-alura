export interface NewTopic {
  title: string;
  message: string;
  solved: boolean;
  created_at: string; // Asumiendo que esta propiedad es de tipo string
  user: {
    id: number; // Debe ser un objeto con una propiedad "id" de tipo number
  };
  course: {
    id: number; // Debe ser un objeto con una propiedad "id" de tipo number
  };
}
