/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import { createAdminClient } from '@/lib/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { ID, Query } from 'node-appwrite';
import { emailConfirmation } from '@/emails/emailConfirmation';

const database = process.env.APPWRITE_DATABASE || '';
const usersCollection = process.env.APPWRITE_USERS_COLLECTIONS || '';
const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_PASS = process.env.GMAIL_PASS || '';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json('Method Not Allowed', {
            headers: { Allow: 'POST' },
            status: 405,
        });
    }
    try {
        const { username, email, password } = await req.json();
        if (!username || !email || !password)
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });

        const { account, databases } = await createAdminClient();

        const existingUsers = await databases.listDocuments(database, usersCollection, [
            Query.equal('email', email),
        ]);

        if (existingUsers.documents.length > 0) {
            return NextResponse.json(
                { message: 'Email already exists. Please use a different email.' },
                { status: 409 }
            );
        }

        const newUser = await account.create(ID.unique(), email, password, username);

        if (!newUser) return NextResponse.json({ message: 'Error creating user' }, { status: 404 });
        
        const session = await account.createEmailPasswordSession(email, password);

        if (!session)
            return NextResponse.json({ message: 'Error creating session' }, { status: 404 });

        const token = session.secret;

        const newAccount = await databases.createDocument(database, usersCollection, ID.unique(), {
            accountId: newUser.$id,
            username: username,
            email: email,
            temporaryToken: token,
            tokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"InLaze" <inlaze@gmail.com>',
            to: email,
            subject: 'Welcome to InLaze',
            html: emailConfirmation({ username, email, token }),
        });

        console.log('Message sent : %s', info.messageId);
        return NextResponse.json(
            { message: 'User created successfully', newAccount, session },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
