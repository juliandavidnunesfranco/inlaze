import { MovieCategory, TmdbApiResponse } from '@/types/movies';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { cookies } from 'next/headers';

const TMDB_API_KEY = process.env.API_KEY_TMDB || '';
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || '';

export interface TMDBResponse<T> {
    page: number;
    data: T;
    total_pages: number;
    total_results: number;
    message?: string;
    status_code?: number;
}

interface AuthResponse {
    success: boolean;
    request_token?: string;
    session_id?: string;
    expires_at?: string;
    status_message?: string;
}

export default class Tmdb {
    protected readonly privateKey: string;
    protected readonly baseUrl: string;
    protected readonly axiosInstance: AxiosInstance;
    protected readonly authHeaders: AxiosRequestConfig['headers'];
    private token: string | null = null;
    private sessionId: string | null = null;

    constructor() {
        this.privateKey = TMDB_API_KEY;
        this.baseUrl = TMDB_BASE_URL;
        this.authHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this.privateKey}`,
        };
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: this.authHeaders,
            params: {
                api_key: this.privateKey,
                language: 'es-ES',
            },
        });

        axiosRetry(this.axiosInstance, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
        });

        if (!this.privateKey) {
            throw new Error('API key is not defined');
        }
    }

    public async authenticate(): Promise<string> {
        try {
            // 1. Obtener un nuevo request token
            const { data: tokenData } = await this.axiosInstance.get<AuthResponse>(
                'authentication/token/new'
            );

            if (!tokenData.success || !tokenData.request_token) {
                throw new Error('Failed to retrieve request token');
            }

            this.token = tokenData.request_token;

            return this.token;
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    }

    public async createSession(requestToken: string): Promise<string | null> {
        try {
            //2- si tiene el token crear una cookie session.
            if (!requestToken || requestToken !== this.token) {
                throw new Error('Request token is not defined');
            }
            const session = await this.axiosInstance.post('authentication/guest_session/new');
            const sessionId = session.data.guest_session_id;

            if (!sessionId) {
                throw new Error('Failed to retrieve session id');
            }
            this.sessionId = sessionId;

            return this.sessionId;
        } catch (error) {
            console.error('Session creation error:', error);
            throw error;
        }
    }

    async getMoviesByCategory(category: MovieCategory, page = 1): Promise<TmdbApiResponse> {
        try {
            const { data } = await this.axiosInstance.get<TmdbApiResponse>(`/movie/${category}`, {
                params: { page },
            });
            return data;
        } catch (error) {
            console.error(`Error fetching ${category} movies:`, error);
            throw error;
        }
    }

    // Método para verificar si hay una sesión activa
    public isAuthenticated(): boolean {
        return !!this.sessionId;
    }

    // Método para cerrar sesión
    public async logout(): Promise<void> {
        if (this.sessionId) {
            try {
                await this.axiosInstance.delete('authentication/session', {
                    data: { session_id: this.sessionId },
                });

                const cookieStore = cookies();
                (await cookieStore).delete('tmdb_session');

                this.sessionId = null;
                this.token = null;
            } catch (error) {
                console.error('Logout error:', error);
                throw error;
            }
        }
    }
}
