import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task } from './types/tasks';
import { TaskStore } from './types/store';

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      funMode: false,
      darkMode: false,
      setupMode: true,
      finishSetup: () => set({ setupMode: false }),

      activeList: null,
      setActiveList: (newActiveList) => set({ activeList: newActiveList }),

      searchTerm: '',
      setSearchTerm: (newSearchTerm) => set({ searchTerm: newSearchTerm }),

      toggleFunMode: () => set((state) => ({ funMode: !state.funMode })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      countingTasks: [],
      setCountingTasks: (newCountingTasks) =>
        set({ countingTasks: newCountingTasks }),

      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: () => {
        const countingTasks = get().countingTasks;
        const count = countingTasks.reduce(
          (acc, task) => (task.completed ? acc + 1 : acc),
          0,
        );
        set({ countCompletedTasks: count });
      },

      setActiveTasks: () => {
        const countingTasks = get().countingTasks;
        const completed = countingTasks.filter((task) => task.completed).length;
        const active = countingTasks.length - completed;
        set({ countActiveTasks: active });
      },
    }),
    {
      name: 'task-tango-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
