/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/appwrite';

export async function POST(request: any) {
    try {
        const { account } = await createAdminClient();
        const { email, password } = await request.json();
        const session = await account.createEmailPasswordSession(email, password);

        console.log(session);
        return Response.json(session);
    } catch (error) {
        console.error(error);
        return new Response('Error', { status: 500 });
    }
}
