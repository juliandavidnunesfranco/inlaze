import { Sidebar } from '@/components/Sidebar';
import VideoCarousel from '@/components/VideoCarousel';

export default function Home() {
    return (
        <>
            <div>
                <VideoCarousel />
                <div className="flex">
                    <Sidebar />
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
