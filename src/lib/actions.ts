'use server';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_URL = process.env.API_BASE_URL || '';

async function searchAction(formData: FormData) {
    const query = formData.get('query')?.toString().trim() || '';
    if (query.trim() !== '') {
        redirect(`/search/${encodeURIComponent(query.trim())}`);
    }
}

async function fetchLogin({ data }: { data: { email: string; password: string } }) {
    const { email, password } = data;
    try {
        const response = await axios.post(`${API_URL}/api/login`, {
            email,
            password,
        });

        const { sessionId } = response.data;
        if (sessionId) {
            const cookie = await cookies();
            cookie.set('session', sessionId.secret, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                expires: new Date(sessionId.expire),
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

async function closeSession() {
    (await cookies()).delete('session');
}

export { searchAction, fetchLogin, closeSession };
