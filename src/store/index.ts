import { create } from "zustand";

interface GlobalStoreStates {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const useGlobalStore = create<GlobalStoreStates>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));
