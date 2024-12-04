'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useCardStore } from '@/store';
import Image from 'next/image';
import { videoComics } from '@/data/video-carousel';
gsap.registerPlugin(useMediaQuery);

export default function VideoCarousel() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(min-width: 641px)');
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
    const { isMenuOpen } = useCardStore();

    useEffect(() => {
        if (isSmallScreen && videoRef.current) {
            gsap.fromTo(
                videoRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            );
            videoRef.current.play().catch(error => console.error('Error playing video:', error));
        }
    }, [isSmallScreen, currentVideoIndex]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleVideoEnd = () => {
                setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videoComics.length);
            };
            videoElement.addEventListener('ended', handleVideoEnd);
            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            if (!isMenuOpen) {
                videoRef.current
                    .play()
                    .catch(error => console.error('Error playing video:', error));
            }
        }
    }, [currentVideoIndex, isMenuOpen]);

    return (
        <>
            {!isMenuOpen && (
                <div
                    ref={containerRef}
                    className={`w-full ${
                        isSmallScreen ? 'h-[80vh]' : 'h-[180px]'
                    } flex items-center justify-center overflow-hidden rounded-lg  relative`}
                >
                    {isSmallScreen ? (
                        <video
                            key={videoComics[currentVideoIndex].id}
                            ref={videoRef}
                            className="w-full h-full object-cover "
                            playsInline
                            muted
                            preload="auto"
                            onEnded={() =>
                                setCurrentVideoIndex(
                                    prevIndex => (prevIndex + 1) % videoComics.length
                                )
                            }
                        >
                            <source src={videoComics[currentVideoIndex].url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image
                            src={'/assets/images/kung-fu-panda.jpg'}
                            alt="Video"
                            className="w-full h-full object-cover"
                            width={320}
                            height={180}
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent" />
                    <div className="flex flex-col absolute inset-0 items-start justify-end py-6 px-4">
                        <h2 className=" text-xl font-bold text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2">
                            {isSmallScreen
                                ? `${videoComics[currentVideoIndex].title}`
                                : 'Kung Fu Panda 4'}
                        </h2>
                        <p className="hidden lg:flex text-lg text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] whitespace-pre-wrap">
                            {isSmallScreen && `${videoComics[currentVideoIndex].description}`}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
