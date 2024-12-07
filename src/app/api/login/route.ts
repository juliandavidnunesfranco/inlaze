/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/appwrite';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { account, databases } = await createAdminClient();
        const { email, password } = await req.json();
        if (!email || !password)
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );

        const session = await account.createEmailPasswordSession(email, password);

        const { documents: users } = await databases.listDocuments(   // Puedo acceder al listado de los usuarios para otras validaciones
            process.env.APPWRITE_DATABASE || '',
            process.env.APPWRITE_USERS_COLLECTIONS || ''
        );
        const sessionId = session;

        if (sessionId) {
            return NextResponse.json({ sessionId, users }, { status: 200 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
