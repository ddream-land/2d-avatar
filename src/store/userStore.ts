"use client";

import { create } from "zustand";
import { UserInfo } from "@/types/user";

interface UserState {
  user: UserInfo | null;
  isLoading: boolean;
  error: Error | null;
  setUser: (user: UserInfo | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const DEFAULT_USER: UserInfo = {
  email: "user@ddream.com",
  uid: -1,
  wallet: "0x00000000000000000000000000000000000000000",
  name: "ddream",
  avatar: "/images/avatar.png",
  stars: 0,
  down_load: 0,
  run: 0,
};

export const useUserStore = create<UserState>((set) => ({
  user: DEFAULT_USER,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
