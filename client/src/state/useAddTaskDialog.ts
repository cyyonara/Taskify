import { create } from "zustand";

interface AddTaskDialogState {
  showAddTaskDialog: boolean;
  openAddTaskDialog: () => void;
  closeAddTaskDialog: () => void;
  toggleAddTaskDialog: () => void;
}

export const useAddTaskDialog = create<AddTaskDialogState>()((set, get) => ({
  showAddTaskDialog: false,
  openAddTaskDialog: () => set({ showAddTaskDialog: true }),
  closeAddTaskDialog: () => set({ showAddTaskDialog: false }),
  toggleAddTaskDialog: () =>
    set({ showAddTaskDialog: !get().showAddTaskDialog }),
}));
