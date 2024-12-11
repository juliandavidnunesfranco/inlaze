'use server';
import { Genre, Movie, MoviesApiResponse } from '@/types/movies';
import axios from 'axios';
import { cookies } from 'next/headers';
import { normalizeString } from './utils';

const API_URL = process.env.API_BASE_URL || '';

async function getCookies() {
    const cookieStore = cookies();
    const session = (await cookieStore).get('session')?.value || null;
    if (!session) {
        return null;
    }
    return session;
}

async function createUserAction({
    data,
}: {
    data: { username: string; email: string; password: string };
}) {
    const { username, email, password } = data;

    try {
        const response = await axios.post(`${API_URL}/api/register`, {
            username,
            email,
            password,
        });

        if (response.status === 200) {
            return {
                message: 'User created successfully',
                status: 200,
            };
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

//Function for the sistem login
async function fetchLogin({ data }: { data: { email: string; password: string } }) {
    const { email, password } = data;
    try {
        const response = await axios.post(`${API_URL}/api/login`, {
            email,
            password,
        });

        const { sessionId } = response.data;
        if (sessionId) {
            const cookie = await cookies();
            cookie.set('session', sessionId.secret, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                expires: new Date(sessionId.expire),
                path: '/',
            });
        }
        return {
            message: 'Login successful',
            status: 200,
            //sessionId: sessionId.secret     preferiblemente no se pasa al lado del cliente
        };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}
async function movieList(): Promise<MoviesApiResponse | null> {
    try {
        const session = (await cookies()).get('session')?.value;
        if (!session) return null;

        const response = await fetch(`${API_URL}/api/movies`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Cookie: `session=${session}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error connecting to movies API:', error);
    }
    return null;
}

async function searchMovies(query: string): Promise<{ results: Movie[] }> {
    try {
        const session = (await cookies()).get('session')?.value;
        let moviesData: MoviesApiResponse | null = null;

        if (session) {
            const response = await fetch(`${API_URL}/api/movies`, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    Cookie: `session=${session}`,
                },
            });

            if (response.ok) {
                moviesData = (await response.json()) as MoviesApiResponse;
            }

            if (moviesData) {
                const allMovies = Object.values(
                    moviesData.moviesByCategory || {}
                ).flat() as Movie[];
                const filteredMovies = allMovies.filter(movie =>
                    movie.title.toLowerCase().includes(query.toLowerCase())
                );
                return { results: filteredMovies };
            }
        }
    } catch (error) {
        console.error('Error searching movies:', error);
    }

    return { results: [] };
}

export async function getMovieByTitle(title: string): Promise<Movie | null> {
    try {
        const moviesData = await movieList();
        if (!moviesData) return null;

        const allMovies = Object.values(moviesData.moviesByCategory).flat() as Movie[];
        return (
            allMovies.find(movie => normalizeString(movie.title) === normalizeString(title)) || null
        );
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
    }
}

export async function getRelatedMovies(movie: Movie): Promise<Movie[]> {
    try {
        const moviesData = await movieList();
        if (!moviesData) return [];

        const allMovies = Object.values(moviesData.moviesByCategory).flat() as Movie[];
        return allMovies
            .filter(m => m.id !== movie.id && m.genre_ids.some(id => movie.genre_ids.includes(id)))
            .slice(0, 4);
    } catch (error) {
        console.error('Error fetching related movies:', error);
        return [];
    }
}

async function getGenres(): Promise<{ result: Genre[] }> {
    try {
        const session = (await cookies()).get('session')?.value;
        if (!session) return { result: [] };

        const response = await fetch(`${API_URL}/api/genres`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Cookie: `session=${session}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            const genres: Genre[] = data.genres;
            return { result: genres };
        }
    } catch (error) {
        console.error('Error searching movies:', error);
    }

    return { result: [] };
}

async function getGenreByName(name: string): Promise<Genre[] | undefined> {
    const genres = await getGenres();

    if (genres.result) {
        const genre = genres.result.find(
            genre => normalizeString(genre.name) === normalizeString(name)
        );
        return genre ? [genre] : undefined;
    }
}

export {
    fetchLogin,
    createUserAction,
    searchMovies,
    getGenreByName,
    getGenres,
    movieList,
    getCookies,
};
