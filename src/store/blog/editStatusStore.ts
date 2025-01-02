import { create } from "zustand";

interface EditState {
  isEdited: boolean;
  setIsEdited: (status: boolean) => void;
}

export const useEditStatusStore = create<EditState>((set) => ({
  isEdited: false,
  setIsEdited: (status) => set({ isEdited: status }),
}));