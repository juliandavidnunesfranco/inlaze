import { Metadata } from 'next';
import { getGenreByName, movieList } from '@/lib/actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Movie } from '@/types/movies';
import { MovieCard } from '@/components';
import { denormalizeString, normalizeString } from '@/lib/utils';

type Params = Promise<{ genre: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { genre } = await params;
    const normalizedGenre = denormalizeString(genre);
    const generos = await getGenreByName(normalizedGenre);

    if (!generos || generos.length === 0) {
        return {
            title: 'Género no encontrado -inLaze',
            description: 'Género no encontrado en la descripción.',
            keywords: ['movies', 'action', 'romance'],
        };
    }

    const genreData = generos.find(g => normalizeString(g.name) === genre);

    return {
        title: genreData ? `${genreData.name} -inLaze` : 'Género no encontrado -inLaze',
        description: genreData
            ? `${genreData.name} inLaze description`
            : 'sin género  en la descripción.',
        keywords: ['movies', 'action', 'romance'],
    };
}

export default async function GenrePage({ params }: { params: Params }) {
    const { genre } = await params;
    const normalizedGenre = denormalizeString(genre);
    const generos = await getGenreByName(normalizedGenre);

    if (!generos) {
        console.log('Genero no encontrado');
        return notFound();
    }
    const moviesData = await movieList();
    if (!moviesData) {
        console.log('No se encontraron películas');
        return notFound();
    }
    const allMovies = Object.values(moviesData.moviesByCategory).flat() as Movie[];
    const genreMovies = Array.from(
        new Set(
            allMovies
                .filter(movie => movie.genre_ids.includes(generos[0].id))
                .map(movie => movie.id)
        )
    ).map(id => allMovies.find(movie => movie.id === id)!);

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className={` text-3xl font-bold text-center mb-8`}>
                Genero: {genre.charAt(0).toLocaleUpperCase() + genre.slice(1)}
            </h1>
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Volver
            </Link>

            {genreMovies.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-100">
                    No se encontraron peliculas en este género.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {genreMovies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
