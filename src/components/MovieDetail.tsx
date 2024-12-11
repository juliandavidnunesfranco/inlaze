'use client';

import { Movie } from '@/types/movies';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFavoriteStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';

interface MovieDetailProps {
    movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
    const [isLocalFavorite, setIsLocalFavorite] = useState(false);

    useEffect(() => {
        setIsLocalFavorite(isFavorite(movie.id));
    }, [movie.id, isFavorite]);

    const toggleFavorite = () => {
        if (isLocalFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie.id);
        }
        setIsLocalFavorite(!isLocalFavorite);
    };

    const rating = Math.round(movie.release_date ? movie.vote_average * 10 : 0);

    const releaseDate = new Date(movie.release_date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="relative">
            {/* Backdrop Image */}
            <div className="absolute inset-0 h-[60vh] overflow-hidden">
                <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover opacity-25"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
            </div>

            {/* Content */}
            <div className="relative pt-[12vh] px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="text-blue-500 hover:underline mb-4 absolute top-4 left-4 "
                    >
                        ← Volver
                    </Link>
                    {/* Poster */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                        <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-evenly">
                            <h1 className="text-4xl font-bold">{movie.title}</h1>
                            <button
                                onClick={toggleFavorite}
                                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                            >
                                <Heart
                                    className={`w-6 h-6 ${
                                        isLocalFavorite
                                            ? 'fill-red-500 stroke-red-500'
                                            : 'stroke-current'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-muted-foreground">
                            <span>{releaseDate}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <span className="text-amber-400">★</span>
                                <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>

                        <p className="text-lg leading-relaxed">{movie.overview}</p>
                        <div className="w-56 h-56">
                            <div className="relative w-10 h-10">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="16"
                                        strokeWidth="3"
                                        fill="none"
                                        className="stroke-gray-700"
                                    />
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="16"
                                        strokeWidth="3"
                                        fill="none"
                                        className="stroke-blue-500"
                                        strokeDasharray={`${rating} 100`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                                    {rating}%
                                </span>
                            </div>
                            <div className="flex items-center justify-start mt-2">
                                <p>total votes: {movie.vote_count.toFixed(0)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
