import { create } from "zustand";

type DropdownStore = {
  closeDropdown: () => void;
  setCloseDropdown: (fn: () => void) => void;
};

export const useDropdownStore = create<DropdownStore>((set) => ({
  closeDropdown: () => {},
  setCloseDropdown: (fn) => set({ closeDropdown: fn }),
}));
