'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { House } from 'lucide-react';
import { closeSession } from '@/lib/actions';

export const SmallMenu = () => {
    const [position, setPosition] = useState('bottom');
    const router = useRouter();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-[0.1px] border-black dark:border-white"
                    >
                        <House />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#f4f4f4] dark:bg-[#5c5c57]">
                    <DropdownMenuLabel className="text-center">Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem
                            onClick={() => router.push('/popular')}
                            value="popular"
                        >
                            Popular
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="favorites"
                            onClick={() => router.push('/favorites')}
                        >
                            Favorites
                        </DropdownMenuRadioItem>
                        <hr className="text-[#5c5c5c] dark:text-[#f4f4f4]" />
                        <DropdownMenuRadioItem
                            value="signUp"
                            onClick={() => router.push('/register')}
                        >
                            Sign Up
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="login" onClick={() => router.push('/login')}>
                            Log in
                        </DropdownMenuRadioItem>
                        <hr />
                        <DropdownMenuRadioItem
                            value="log Out"
                            onClick={() => {
                                closeSession();
                                router.refresh();
                            }}
                        >
                            Log Out
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
