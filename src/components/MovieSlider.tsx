/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Movie } from '@/types/movies';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

interface MovieSliderProps {
    title: string;
    category: string;
    movies: Movie[];
}

export const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
    const swiperRef = useRef<any>(null);

    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.slideNext();
    }, []);

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                            <Film className="w-5 h-5" />
                            Películas
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Previous movies"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Next movies"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <Swiper
                    onSwiper={swiper => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {movies.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <div className="group cursor-pointer">
                                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 mb-2">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {movie.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(movie.release_date).getFullYear()}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
