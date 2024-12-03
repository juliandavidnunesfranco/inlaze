import { FilterGenres, SearchBar } from '@/components';

export function Sidebar({ q }: { q: string }) {
    return (
        <div className="hidden md:flex">
            <div className=" w-[260px] h-screen border-r bg-[#f4f4f4] dark:bg-[#262626]">
                <div className="space-y-4 py-4">
                    <SearchBar initialQuery={q || ''} />
                    <FilterGenres />
                </div>
            </div>
        </div>
    );
}
