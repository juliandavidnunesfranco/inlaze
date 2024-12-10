import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';
import './globals.css';
import { TopBar } from '@/components';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

type TemplateString = {
    template: string;
    default: string;
};
export const metadata: Metadata & { title: TemplateString } = {
    title: {
        template: '%s | inLaze',
        default: 'inLaze | Explora nuestras películas',
    },
    description: 'inLaze description',
    generator: 'Next.js',
    applicationName: 'inLaze',
    referrer: 'origin-when-cross-origin',
    keywords: ['movies', 'aplication', 'inlaze'],
    creator: 'inLaze',
    publisher: 'inLaze',
    authors: [
        {
            name: 'Julian David Nunez Franco',
            url: 'https://github.com/juliandavidnunesfranco',
        },
    ],
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favico.ico',
    },
};

export default function RootLayout({
    children,
    auth,
}: Readonly<{
    children: React.ReactNode;
    auth: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        <header>
                            {/* @ts-expect-error Server Component */}
                            <TopBar />
                        </header>
                        <main className="flex-grow flex flex-col">
                            {auth}
                            {children}
                        </main>
                        <footer className="py-2 text-center text-sm text-muted-foreground">
                            <p>Inlaze {new Date().getFullYear()} &copy; All rights reserved.</p>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
