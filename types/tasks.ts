export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface NewTask {
  title: string;
}
