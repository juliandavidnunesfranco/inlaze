import Tmdb from '@/lib/tmdb';
import { cookies } from 'next/headers';
import { Movie, MovieCategory } from '@/types/movies';
import { NextRequest, NextResponse } from 'next/server';

const categories: { id: MovieCategory; title: string }[] = [
    { id: 'popular', title: 'Películas Populares' },
    { id: 'now_playing', title: 'En Cartelera' },
    { id: 'upcoming', title: 'Próximos Estrenos' },
    { id: 'top_rated', title: 'Mejor Valoradas' },
];

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return NextResponse.json({ message: 'Unauthorized: No session cookie' }, { status: 401 });
    }

    const tmdb = new Tmdb();
    try {
        const tmdbSessionCookie = await cookies();
        let tmdbSessionId = tmdbSessionCookie.get('tmdb_session')?.value;

        if (!tmdbSessionId) {
            const request = await tmdb.authenticate();
            tmdbSessionId = (await tmdb.createSession(request)) || '';

            tmdbSessionCookie.set('tmdb_session', tmdbSessionId, {
                // esta cookie no estara en el navegador dado que se creo en el ambito de api
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
        }

        if (tmdbSessionId !== tmdbSessionCookie.get('tmdb_session')?.value) {
            return NextResponse.json(
                { message: 'Unauthorized: No session cookie jz' },
                { status: 401 }
            );
        }
        const moviesByCategory: Record<MovieCategory, Movie[]> = {
            popular: [],
            now_playing: [],
            upcoming: [],
            top_rated: [],
        };

        const results = await Promise.all(
            categories.map(async ({ id }) => {
                const response = await tmdb.getMoviesByCategory(id);
                return { category: id, movies: response.results };
            })
        );

        results.forEach(({ category, movies }) => {
            moviesByCategory[category] = movies;
        });

        return NextResponse.json({ message: 'ok', moviesByCategory }, { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
