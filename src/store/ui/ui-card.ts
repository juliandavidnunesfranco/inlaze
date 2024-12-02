import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { immer } from 'zustand/middleware/immer';

interface State {
    isMenuOpen: boolean;
    isCardOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    openCard: () => void;
    closeCard: () => void;
}

export const useCardStore = create<State>()(
    persist(
        immer((set) => ({
            isMenuOpen: false,
            isCardOpen: false,
            openMenu: () =>
                set((state) => {
                    state.isMenuOpen = true;
                }),
            closeMenu: () =>
                set((state) => {
                    state.isMenuOpen = false;
                }),
            openCard: () =>
                set((state) => {
                    state.isCardOpen = true;
                }),
            closeCard: () =>
                set((state) => {
                    state.isCardOpen = false;
                }),
        })),
        { name: 'card-storage', storage: createJSONStorage(() => sessionStorage) }
    )
);