import {create} from "zustand";

interface GlobalStoreState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useGlobalStore = create<GlobalStoreState>((set) => ({
    sidebarOpen: false,
    toggleSidebar: () => set((state) => ({sidebarOpen: !state.sidebarOpen})),
    setSidebarOpen: (open) => set({sidebarOpen: open}),
}));
