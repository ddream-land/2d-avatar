import { create } from "zustand";

interface InitStore {
  isInit: boolean;
  setIsInit: (value: boolean) => void;
}

export const useInitStore = create<InitStore>((set) => ({
  isInit: false,
  setIsInit: (value) => set({ isInit: value }),
}));
