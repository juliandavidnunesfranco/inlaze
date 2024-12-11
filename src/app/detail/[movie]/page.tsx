import { Metadata } from 'next';
import { getMovieByTitle, getRelatedMovies } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { MovieDetail } from '@/components/MovieDetail';
import { MovieGrid } from '@/components/MovieGrid';
import { denormalizeString } from '@/lib/utils';

export async function generateMetadata({
    params,
}: {
    params: { movie: string };
}): Promise<Metadata> {
    const title = denormalizeString(params.movie);
    const movie = await getMovieByTitle(title);

    if (!movie) {
        return {
            title: 'Película No Encontrada - inLaze',
            description: 'La película solicitada no fue encontrada',
        };
    }

    return {
        title: `${movie.title} - inLaze`,
        description: movie.overview,
    };
}

export default async function MoviePage({ params }: { params: { movie: string } }) {
    const title = denormalizeString(params.movie);
    const movie = await getMovieByTitle(title);

    if (!movie) return notFound();

    const relatedMovies = await getRelatedMovies(movie);

    return (
        <main className="min-h-screen">
            <MovieDetail movie={movie} />

            {relatedMovies.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-2xl font-bold mb-8">Películas relacionadas</h2>
                    <MovieGrid movies={relatedMovies} />
                </section>
            )}
        </main>
    );
}
