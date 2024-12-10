/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Movie } from '@/types/movies';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';

import 'swiper/css';
import 'swiper/css/navigation';

interface MovieSliderProps {
    title: string;
    category?: string;
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

    console.log('MOVIES', movies[0])
    return (
        <section className="py-4 w-full overflow-hidden">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold dark:text-white text-black">
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                    </h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full hover:bg-gray-800/50"
                            aria-label="Previous movies"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full hover:bg-gray-800/50"
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
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="!overflow-visible"
                >
                    {movies.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
