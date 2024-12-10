'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.API_BASE_URL || '';

async function createUserAction({
    data,
}: {
    data: { username: string; email: string; password: string };
}) {
    const { username, email, password } = data;

    try {
        const response = await axios.post(`${API_URL}/api/register`, {
            username,
            email,
            password,
        });

        if (response.status === 200) {
            return {
                message: 'User created successfully',
                status: 200,
            };
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

//Function for the sistem login
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
                path: '/',
            });
        }
        return {
            message: 'Login successful',
            status: 200,
            //sessionId: sessionId.secret     preferiblemente no se pasa al lado del cliente
        };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

export { fetchLogin, createUserAction };
