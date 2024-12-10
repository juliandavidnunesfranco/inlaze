import axios from 'axios';
import { notFound, redirect } from 'next/navigation';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const API_URL = process.env.API_BASE_URL || '';

// This page is shown after the user clicks on the confirmation link in the email
export default async function Page(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    const email = searchParams.email?.toString();
    const token = searchParams.token?.toString();
    const validateSearchParams = email && token ? true : false;

    if (!validateSearchParams) {
        notFound();
    }
    const response = await axios.post(`${API_URL}/api/email-confirmation`, { email, token });
    if (response.status !== 200) {
        notFound();
    } else {
        redirect('/');
    }

    return (
        <section className="w-screen h-fit p-10 gap-4">
            <div className="bg-slate-100 rounded-md w-full shadow-md shadow-slate-500 p-8 justify-center items-center flex flex-col py-12 gap-8">
                <h2 className="text-2xl text-center font-bold text-slate-700">
                    {validateSearchParams
                        ? 'Your email has been confirmed!'
                        : 'Something went wrong...'}
                </h2>
            </div>
        </section>
    );
}
