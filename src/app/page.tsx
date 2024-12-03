import { Sidebar, VideoCarousel } from '@/components';

export default function Home({ searchParams }: { searchParams: { q: string } }) {
    const query = searchParams.q ? searchParams.q.trim() : '';

    return (
        <>
            <div>
                <VideoCarousel />
                <div className="flex">
                    <Sidebar q={query} />
                    <main className="flex-1 p-8 bg-[#f4f4f4] dark:bg-[#5c5c57]">
                        <div className="space-y-8">
                            <section>
                                <h2>titulo</h2>

                                <p>descripcion</p>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
