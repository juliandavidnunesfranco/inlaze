import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';
import './globals.css';
import TopBar from '@/components/TopBar';

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

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
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
                            <TopBar />
                        </header>
                        <main className="flex-grow">{children}</main>
                        <footer className="py-6 text-center text-sm text-muted-foreground">
                            <p>© 2024 Inlaze. All rights reserved.</p>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
