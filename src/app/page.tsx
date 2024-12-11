import { MovieSlider, Sidebar, VideoCarousel, FavoritesList } from '@/components';
import { movieList } from '@/lib/actions';
import { Movie } from '@/types/movies';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const moviesData = await movieList();

    if (!moviesData || Object.keys(moviesData.moviesByCategory).length === 0) {
        return {
            title: 'Bienvenido a inLaze',
            description:
                'Explora nuestra selección de películas y encuentra tus favoritas en inLaze.',
            keywords: 'películas, inLaze, entretenimiento, ver películas',
        };
    }

    const categories = Object.keys(moviesData.moviesByCategory);
    const title = `inLaze - Explora nuestras películas`;
    const description = `Explora nuestras categorías: ${categories.join(
        ', '
    )}. Encuentra tus películas favoritas y más en inLaze.`;
    const keywords = categories.join(', ');

    return {
        title,
        description,
        keywords,
    };
}

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = (await searchParams).query?.toString() || '';
    const moviesData = await movieList();

    return (
        <>
            <VideoCarousel />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar q={query} />
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-8 p-8">
                        {moviesData ? (
                            <>
                                {Object.entries(
                                    moviesData.moviesByCategory as Record<string, Movie[]>
                                ).map(([category, movies]: [string, Movie[]]) => (
                                    <MovieSlider
                                        key={category}
                                        title={category}
                                        category={category}
                                        movies={movies}
                                    />
                                ))}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4">Tus Favoritos</h2>
                                    <FavoritesList
                                        movies={
                                            Object.values(
                                                moviesData.moviesByCategory
                                            ).flat() as Movie[]
                                        }
                                    />
                                </section>
                            </>
                        ) : (
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                No hay películas disponibles.
                                <br />
                                Por favor, inicie sesión
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
