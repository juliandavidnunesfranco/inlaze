export const TMDB_CONFIG = {
    BASE_URL: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    API_KEY: process.env.API_KEY_TMDB || '',
    LANGUAGE: 'es-ES',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  } as const;
  
  export const MOVIE_CATEGORIES = [
    { id: 'popular', title: 'Películas Populares' },
    { id: 'now_playing', title: 'En Cartelera' },
    { id: 'upcoming', title: 'Próximos Estrenos' },
    { id: 'top_rated', title: 'Mejor Valoradas' },
  ] as const;