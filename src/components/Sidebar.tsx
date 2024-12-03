'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Western',
];

export function Sidebar() {
    return (
        <div className="hidden md:flex">
            <div className=" w-[260px] border-r bg-[#f4f4f4] dark:bg-[#262626]">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Search</h2>

                        <form>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="keywords"
                                    className="w-full bg-white dark:bg-[#1c1c1c] border-b-2 border-[#e0e0e0] dark:border-[#545454] rounded-t-md px-4 py-3 text-sm focus:outline-none focus:border-[#007bff] dark:focus:border-primary transition-colors text-[#333333] dark:text-white"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <span className="sr-only">Buscar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-3 py-2 ">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Genres</h2>
                        <ScrollArea className="h-[355px] px-1 bg-white dark:bg-[#1c1c1c] rounded-md">
                            <div className="space-y-1">
                                {genres.map(genre => (
                                    <button
                                        key={genre}
                                        className={cn(
                                            'w-full flex items-center py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground',
                                            'justify-between'
                                        )}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
