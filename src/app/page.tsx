import { Sidebar, VideoCarousel } from '@/components';
import { getLoggedInUser, signOut } from '@/lib/appwrite';

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = (await searchParams).query?.toString() || '';
    const user = await getLoggedInUser();

    return (
        <>
            <div>
                <VideoCarousel />
                <div className="flex">
                    <Sidebar q={query} />
                    <main className="flex-1 p-8 bg-[#f4f4f4] dark:bg-[#5c5c57] text-white">
                        <div className="space-y-8">
                            <section>
                                <h2>titulo</h2>
                                {user && user.name}
                                <p>descripcion</p>

                                <ul className="text-black">
                                    <li>
                                        <strong>Email:</strong> {user?.email}
                                    </li>
                                    <li>
                                        <strong>Name:</strong> {user?.name}
                                    </li>
                                    <li>
                                        <strong>ID: </strong> {user?.$id}
                                    </li>
                                </ul>

                                <form action={signOut}>
                                    <button type="submit">Sign out</button>
                                </form>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
