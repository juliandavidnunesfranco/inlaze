import { cookies } from 'next/headers';
import { FavoriteMovies } from '@/components/FavoriteMovies';
import { Movie } from '@/types/movies';
import Link from 'next/link';

const API_BASE_URL = process.env.API_BASE_URL || '';

export default async function FavoritesPage() {
    const session = (await cookies()).get('session')?.value;
    let moviesData = null;

    try {
        if (session) {
            const response = await fetch(`${API_BASE_URL}/api/movies`, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    Cookie: `session=${session}`,
                },
            });
            if (response.ok) {
                moviesData = await response.json();
            }
        }
    } catch (error) {
        console.error('Error connecting to movies API:', error);
    }

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
