import { Metadata } from 'next';
import { getMovieByTitle, getRelatedMovies } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { MovieDetail } from '@/components/MovieDetail';
import { MovieGrid } from '@/components/MovieGrid';
import { denormalizeString } from '@/lib/utils';


type Params = Promise<{ movie: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { movie } = await params;
    const title = denormalizeString(movie);
    const movies = await getMovieByTitle(title);


    if (!movies) {
        return {
            title: 'Película No Encontrada - inLaze',
            description: 'La película solicitada no fue encontrada',
        };
    }

    return {
        title: `${movies.original_title} - inLaze`,
        description: movies.overview,
        openGraph: {
            title: movies.original_title,
            description: movies.overview,
            images: [`https://image.tmdb.org/t/p/w500${movies.poster_path}`],
        },
    };
}

export default async function MoviePage({ params }: { params: Params }) {
    const { movie } = await params;
    const title = denormalizeString(movie);
    const movies = await getMovieByTitle(title);

    if (!movies) return notFound();

    const relatedMovies = await getRelatedMovies(movies);

    return (
        <main className="min-h-screen">
            <MovieDetail movie={movies} />

            {relatedMovies.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-2xl font-bold mb-8">Películas relacionadas</h2>
                    <MovieGrid movies={relatedMovies} />
                </section>
            )}
        </main>
    );
}
