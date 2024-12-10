import { MovieCard, SearchBar } from '@/components';
import { searchMovies } from '@/lib/actions';
import { Movie } from '@/types/movies';
import { Metadata } from 'next';
import Link from 'next/link';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
    title: 'Buscar',
};

export default async function SearchPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    const query = searchParams.query?.toString() || '';
    const decodeQuery = decodeURIComponent(query);

    let searchResults: Movie[] = [];

    if (decodeQuery.trim() !== '' && query) {
        const data = await searchMovies(decodeQuery);

        const uniqueResults = Array.from(new Set(data.results.map(movie => movie.id))).map(
            id => data.results.find(movie => movie.id === id)!
        );
        searchResults = uniqueResults
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className={` text-3xl font-bold text-center mb-8`}>Resultados de búsqueda</h1>
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Volver
            </Link>
            <SearchBar initialQuery={decodeQuery} />
            {decodeQuery.trim() === '' ? (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Por favor, ingrese un término de búsqueda.
                </p>
            ) : searchResults.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    No se encontraron resultados para {decodeQuery}.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {searchResults.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
