'use client';
import { cn, normalizeString } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { genres } from '@/data/genres-list';
import { useRouter } from 'next/navigation';

export const FilterGenres = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleGenreClick = (genre: string) => {
        const normalizedGenre = normalizeString(genre);
        router.push(`/genres/${normalizedGenre}`);
        setIsOpen(false);
    };

    return (
        <>
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Genres</h2>

                <Button
                    variant="outline"
                    className="w-full justify-between mb-2 h-12 border-2 bg-white dark:bg-[#1c1c1c] focus:outline-none focus:border-[#007bff] dark:focus:border-primary transition-colors text-[#333333] dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ___________________
                    <ChevronUp
                        className={cn(
                            'h-6 w-6 opacity-50 transition-transform duration-200',
                            isOpen && 'rotate-180'
                        )}
                    />
                </Button>
                {isOpen && (
                    <ScrollArea className="h-[355px] w-[230px] px-1 bg-white dark:bg-[#1c1c1c] rounded-md">
                        <div className="space-y-1">
                            {genres.map(genre => (
                                <button
                                    key={genre}
                                    className={cn(
                                        'w-full flex items-center py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground',
                                        'justify-between'
                                    )}
                                    onClick={() => handleGenreClick(genre)}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </>
    );
};
