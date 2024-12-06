import Tmdb from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    try {
        const tmdb = new Tmdb();
        const session_id = await tmdb.authenticate();
        return NextResponse.json({ session_id }, { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
