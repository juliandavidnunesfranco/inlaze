'use server';
import { redirect } from 'next/navigation';

export async function searchAction(formData: FormData) {
    'use server';
    const query = formData.get('query')?.toString().trim() || '';
    if (query.trim() !== '') {
        redirect(`/search/${encodeURIComponent(query.trim())}`);
    }
}
