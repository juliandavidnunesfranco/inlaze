'use client';

import { UserRound } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { SmallMenu } from './SmallMenu';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut } from '@/lib/appwrite';

export const Logout = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex pr-10 gap-2">
                <div className="hidden md:flex text-right gap-4 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-[0.1px] border-black dark:border-white"
                            >
                                <UserRound className="h-[1.2rem] w-[1.2rem] " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-[#f4f4f4] dark:bg-[#5c5c57]">
                            <DropdownMenuRadioGroup>
                                <DropdownMenuItem
                                    onClick={() => {
                                        
                                        signOut();
                                        router.refresh();
                                    }}
                                >
                                    logout
                                </DropdownMenuItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ModeToggle />
                </div>
                {/* small menu */}
                <div className="md:hidden">
                    <SmallMenu />
                </div>
            </div>
        </>
    );
};
