export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_count: number;
}

export type MovieCategory = 'popular' | 'now_playing' | 'upcoming' | 'top_rated';

export interface MoviesByCategory {
    [key in MovieCategory]?: Movie[];
}

export interface MoviesApiResponse {
    message: string;
    moviesByCategory: MoviesByCategory;
}

export interface TmdbApiResponse {
    results: Movie[];
}
