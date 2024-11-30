import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function TopBar() {
    return (
        <nav className="w-full p-6 flex items-center justify-between">
            <div className="flex items-center">
                {/* Logo and Title */}
                <div className="px-14">
                    <h1 className="text-2xl font-bold uppercase">quickbet</h1>
                    <p className="text-sm text-muted-foreground uppercase text-center">Movies</p>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-10">
                    <Link
                        href="/popular"
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
            <div className="flex pr-10">
                <div className="hidden md:flex text-right gap-4 items-center">
                    <p className="text-sm text-muted-foreground">log in</p>
                    <ModeToggle />
                </div>
                <div className="md:hidden">
                    <p>menu</p>
                </div>
            </div>
        </nav>
    );
}
