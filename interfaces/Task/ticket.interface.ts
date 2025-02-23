export interface Task {
  id: string;
  id_user: string;
  title: string;
  description: string;
  date: string;
  status: boolean;
  created_at: string;
}

export interface FilterTasks {
  created_at: boolean;
  title: string;
  status: boolean | null;
}
