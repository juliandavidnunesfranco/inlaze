import { Movie } from '@/types/movies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function normalizeString(str: string): string {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

export function denormalizeString(str: string): string {
    return decodeURIComponent(str).toLowerCase();
}

export function getUniqueMovies(movies: Movie[]): Movie[] {
  return Array.from(new Set(movies.map(movie => movie.id))).map(
      id => movies.find(movie => movie.id === id)!
  );
}
