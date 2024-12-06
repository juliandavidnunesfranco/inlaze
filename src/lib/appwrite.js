'use server';
import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';

const endpoint = process.env.APPWRITE_ENDPOINT || '';
const project = process.env.APPWRITE_PROJECT || '';
const key = process.env.APPWRITE_KEY || '';
//const database = process.env.APPWRITE_DATABASE || '';
//const usersCollection = process.env.APPWRITE_USERS_COLLECTIONS || '';
//const moviesCollection = process.env.APPWRITE_MOVIES_COLLECTIONS || '';
//const storage = process.env.APPWRITE_STORAGE || '';






const createSessionClient = async request => {
    const client = new Client().setEndpoint(endpoint).setProject(project);

    const session = await request.cookies().get('session');

    if (!session || !session.value) {
        throw new Error('No session');
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
};

const createAdminClient = async () => {
    const client = new Client().setEndpoint(endpoint).setProject(project).setKey(key);

    return {
        get account() {
            return new Account(client);
        },
    };
};

const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        console.error('Error getting logged in user:', error);
        return null;
    }
};

const signUpWithEmail = async formData => {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    await cookies().set('session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });

    redirect('/');
};

const signOut = async () => {
    const { account } = await createSessionClient();

    await cookies().delete('session');
    await account.deleteSession('current');

    redirect('/signup');
};
export { signUpWithEmail, getLoggedInUser,  createAdminClient, signOut, createSessionClient };
