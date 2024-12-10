import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
    favorites: number[];
    addFavorite: (movieId: number) => void;
    removeFavorite: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: movieId =>
                set(state => ({
                    favorites: [...state.favorites, movieId],
                })),
            removeFavorite: movieId =>
                set(state => ({
                    favorites: state.favorites.filter(id => id !== movieId),
                })),
            isFavorite: movieId => get().favorites.includes(movieId),
        }),
        {
            name: 'favorite-storage',
        }
    )
);
