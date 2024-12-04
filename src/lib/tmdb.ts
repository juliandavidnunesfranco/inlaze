import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

const TMDB_API_KEY = process.env.API_KEY_TMDB || '';
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || '';

//type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface TMDBRespose<T> {
    page: number;
    data: T;
    total_pages: number;
    total_results: number;
    message?: string;
    status_code?: number;
}

// interface Request {
//     method: HTTPMethod;
//     path: string;
//     headers?: Record<string, string>;
//     body?: Record<string, unknown>;
//     query?: Record<string, string>;
// }

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
            baseURL: `${this.baseUrl}`,
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

    public async authenticate(): Promise<void> {
        try {
            const resToken = await this.axiosInstance.get('authentication/token/new');
            const requestToken = resToken.data.request_token;

            if (!requestToken) {
                throw new Error('Failed to retrieve request token');
            }
            this.token = requestToken;
            console.log('Request token', requestToken);

            const session = await this.axiosInstance.post('authentication/guest_session/new');
            const sessionId = session.data.guest_session_id;
            if (!sessionId) {
                throw new Error('Failed to retrieve session ID');
            }
            this.sessionId = sessionId;
            console.log('Session ID', sessionId);
            return sessionId;
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    }
}
