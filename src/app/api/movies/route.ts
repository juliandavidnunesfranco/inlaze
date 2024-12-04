import Tmdb from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    const tmdb = new Tmdb();
    console.log('tmdb:', tmdb);

    const session_id = await tmdb.authenticate();
    console.log('session_id:', session_id);

    return NextResponse.json({ session_id }, { status: 200 });
}
