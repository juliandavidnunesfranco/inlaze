import { Sidebar, VideoCarousel } from '@/components';
import { MovieSlider } from '@/components/MovieSlider';
import { Movie } from '@/types/movies';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.API_BASE_URL || '';

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = (await searchParams).query?.toString() || '';
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
        <>
            <div>
                <VideoCarousel />
                <div className="flex">
                    <Sidebar q={query} />
                    <main className="flex-1 p-8 bg-[#f4f4f4] dark:bg-[#5c5c57] text-white">
                        <div className="space-y-8">
                            {moviesData ? (
                                Object.entries(
                                    moviesData.moviesByCategory as Record<string, Movie[]>
                                ).map(([category, movies]: [string, Movie[]]) => (
                                    <MovieSlider
                                        key={category}
                                        title={category}
                                        category={category}
                                        movies={movies}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    No hay películas disponibles.
                                    <br />
                                    Por favor, inicie sesión
                                </p>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
