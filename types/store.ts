import { Task } from './tasks';

export interface TaskStore {
  funMode: boolean;
  darkMode: boolean;
  setupMode: boolean;
  finishSetup: () => void;

  activeList: string | null;
  setActiveList: (list: string) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;

  toggleFunMode: () => void;
  toggleDarkMode: () => void;

  countingTasks: Task[];
  setCountingTasks: (tasks: Task[]) => void;

  countCompletedTasks: number;
  countActiveTasks: number;

  setCountCompletedTasks: () => void;
  setActiveTasks: () => void;
}
