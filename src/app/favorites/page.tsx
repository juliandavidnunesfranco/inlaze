import { FavoriteMovies } from '@/components';
import { Movie } from '@/types/movies';
import Link from 'next/link';
import { movieList } from '@/lib/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mis Películas Favoritas - inLaze',
    description: 'Mis películas favoritas en inLaze',
    keywords: ['movies', 'action', 'romance'],
};

export default async function FavoritesPage() {
    const moviesData = await movieList();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Mis Películas Favoritas</h1>
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Volver
            </Link>
            {moviesData ? (
                <FavoriteMovies
                    movies={Object.values(moviesData.moviesByCategory).flat() as Movie[]}
                />
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    No se pudieron cargar las películas. Por favor, inicie sesión o intente más
                    tarde.
                </p>
            )}
        </div>
    );
}
