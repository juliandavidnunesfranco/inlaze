'use client';
import { useFavoriteStore } from '@/store';
import { MovieCard } from './MovieCard';
import { useEffect, useState } from 'react';
import { Movie } from '@/types/movies';

interface FavoriteMoviesProps {
    movies: Movie[];
}

export function FavoriteMovies({ movies }: FavoriteMoviesProps) {
    const { favorites } = useFavoriteStore();
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const filteredMovies = movies.filter(movie => favorites.includes(movie.id));
        setFavoriteMovies(filteredMovies);
    }, [movies, favorites]);

    if (favoriteMovies.length === 0) {
        return (
            <p className="text-center text-gray-600 dark:text-gray-400">
                No tienes películas favoritas aún. ¡Explora y añade algunas!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteMovies &&
                favoriteMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
    );
}
