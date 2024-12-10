'use client';

import { useFavoriteStore } from '@/store';
import { MovieCard } from './MovieCard';
import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}

interface FavoritesListProps {
    movies: Movie[];
}

export function FavoritesList({ movies }: FavoritesListProps) {
    const { favorites } = useFavoriteStore();

    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const filteredMovies = movies.filter(movie => favorites.includes(movie.id));
        const uniqueMovies = Array.from(new Set(filteredMovies.map(m => m.id))).map(
            id => filteredMovies.find(m => m.id === id)!
        );
        setFavoriteMovies(uniqueMovies);
    }, [movies, favorites]);

    if (favoriteMovies.length === 0) {
        return <p className="text-center text-gray-500">No tienes películas favoritas aún.</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3">
            {favoriteMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
