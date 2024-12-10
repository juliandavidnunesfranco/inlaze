'use server';
import { Client, Account, Databases } from 'node-appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const endpoint = process.env.APPWRITE_ENDPOINT || '';
const project = process.env.APPWRITE_PROJECT || '';
const key = process.env.APPWRITE_KEY || '';

const createSessionClient = async () => {
    const client = new Client().setEndpoint(endpoint).setProject(project);
    const session = (await cookies()).get('session');

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
        get databases() {
            return new Databases(client);
        },
    };
};

const signOut = async () => {
    const { account } = await createSessionClient();
    await account.deleteSession('current');
    (await cookies()).delete('session');

    redirect('/');
};
export { createAdminClient, signOut, createSessionClient };
