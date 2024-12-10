import { SearchBar } from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
    title: 'Buscar',
};

export default async function SearchPage(props: { searchParams: SearchParams }) {
   
    const searchParams = await props.searchParams;
    const query = searchParams.query?.toString() || '';
    const decodeQuery = decodeURIComponent(query);
    
    if (decodeQuery.trim() !== '' && query) {
        console.log(decodeQuery);
        console.log(query);
    }
    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className={` text-3xl font-bold text-center mb-8`}>Resultados de búsqueda</h1>
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Volver
            </Link>
            <SearchBar initialQuery={decodeQuery} />
            {decodeQuery.trim() === '' && (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Por favor, ingrese un término de búsqueda.
                </p>
            )}
        </div>
    );
}
