import Tmdb from '@/lib/tmdb';
import { Genre } from '@/types/movies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    if (req.method !== 'GET' || !req.cookies.get('session')?.value) {
        return Response.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie ||  sessionCookie !== req.cookies.get('session')?.value) {
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

        const genres: Genre[] = await tmdb.getGenresList();

        return NextResponse.json({ message: 'ok', genres }, { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
