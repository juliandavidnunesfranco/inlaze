import { Sidebar, VideoCarousel } from '@/components';

export const dynamic = 'force-dynamic';

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = (await searchParams).query?.toString() || '';

    return (
        <>
            <div>
                <VideoCarousel />
                <div className="flex">
                    <Sidebar q={query} />
                    <main className="flex-1 p-8 bg-[#f4f4f4] dark:bg-[#5c5c57] text-white">
                        <div className="space-y-8"></div>
                    </main>
                </div>
            </div>
        </>
    );
}
