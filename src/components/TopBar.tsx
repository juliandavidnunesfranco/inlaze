'use client';
import Link from 'next/link';
import { ModeToggle, SmallMenu } from '@/components';
import { Button } from './ui/button';
import { UserRound } from 'lucide-react';
import { Logout } from './Logout';

export default function TopBar({ session }: { session: string | undefined }) {
    return (
        <>
            <nav className="w-full p-6 flex items-center justify-between">
                <div className="flex items-center">
                    {/* Logo and Title */}
                    <div className="px-14">
                        <h1 className="text-2xl font-bold uppercase">quickbet</h1>
                        <p className="text-sm text-muted-foreground uppercase text-center">
                            Movies
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-10">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Popular
                        </Link>
                        <Link
                            href="/favorites"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Favorites
                        </Link>
                    </div>
                </div>

                {/* Log in - Menu DropDown*/}
                {!session ? (
                    <div className="flex pr-10 gap-2">
                        <div className="hidden md:flex text-right gap-4 items-center">
                            <Link href="/register" prefetch={false}>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="border-[0.1px] border-black dark:border-white"
                                >
                                    <UserRound className="h-[1.2rem] w-[1.2rem] " />
                                </Button>
                            </Link>
                            <ModeToggle />
                        </div>
                        {/* small menu */}
                        <div className="md:hidden">
                            <SmallMenu />
                        </div>
                    </div>
                ) : (
                    <Logout />
                )}
            </nav>
        </>
    );
}
