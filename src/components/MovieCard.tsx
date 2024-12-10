'use client';
import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/store';
import { useEffect, useState } from 'react';

interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        release_date: string;
        poster_path: string;
        vote_average: number;
    };
}

export function MovieCard({ movie }: MovieCardProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
    const [isLocalFavorite, setIsLocalFavorite] = useState(false);

    useEffect(() => {
        const favoriteStatus = isFavorite(movie.id);
        setIsLocalFavorite(favoriteStatus);
    }, [movie.id, isFavorite]);

    const rating = Math.round(movie.release_date ? movie.vote_average * 10 : 0);

    const formattedDate = new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const toggleFavorite = () => {
        if (isLocalFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie.id);
        }
        setIsLocalFavorite(!isLocalFavorite);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden bg-gray-900 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="aspect-[2/3] relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-medium mb-1 line-clamp-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{formattedDate}</p>
                <div className="flex items-center justify-between">
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
                    <button
                        onClick={toggleFavorite}
                        className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                    >
                        <Heart
                            className={`w-6 h-6 ${
                                isLocalFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-white'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
