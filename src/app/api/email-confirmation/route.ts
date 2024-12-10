/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Query } from 'node-appwrite';

const database = process.env.APPWRITE_DATABASE || '';
const usersCollection = process.env.APPWRITE_USERS_COLLECTIONS || '';

export async function POST(req: NextRequest) {
    const { email, token } = await req.json();
    if (!email || !token)
        return NextResponse.json({ message: 'Email and token are required' }, { status: 400 });

    try {
        const { databases } = await createAdminClient();

        const existingUsers = await databases.listDocuments(database, usersCollection, [
            Query.equal('email', email),
        ]);
        if (existingUsers.documents.length === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const user = existingUsers.documents[0];

        if (user.temporaryToken !== token) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        if (new Date(user.tokenExpiry) < new Date()) {
            return NextResponse.json({ message: 'Token has expired' }, { status: 401 });
        }

        await databases.updateDocument(database, usersCollection, user.$id, {
            temporaryToken: null,
            tokenExpiry: null,
        });

        return NextResponse.json({ message: 'Token validated successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
