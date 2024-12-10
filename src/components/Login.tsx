/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCardStore } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserAction, fetchLogin } from '@/lib/actions';
import { cx } from 'class-variance-authority';
import { z } from 'zod';

const safeString = z
    .string()
    .regex(/^[^<>{}]*$/, 'Input contains invalid characters (e.g., HTML or SQL injection).');

const registerSchema = z.object({
    username: safeString.min(3, 'Username must be at least 3 characters').trim(),
    email: z
        .string()
        .email('Invalid email address')
        .trim()
        .regex(/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/, 'Invalid email format'), // Re-validate email format
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/, 'Password contains invalid characters.') // Only allow safe characters
        .trim(),
});

const loginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .trim()
        .regex(/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/, 'Invalid email format'), // Re-validate email format
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/, 'Password contains invalid characters.') // Only allow safe characters
        .trim(),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const routeLogin = pathname.includes('login');
    const { isCardOpen, openCard, closeCard } = useCardStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAuthLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const data = { email, password };
            const validate = loginSchema.safeParse({ email, password });
            if (!validate.success) {
                alert(`Error : ${validate.error.errors[0].message}`);
                return;
            }
            await fetchLogin({ data });
            alert('Login successful');
        } catch (error: any) {
            console.error(error);
            alert(`Error please try again - ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const createUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const email = (document.getElementById('new_email') as HTMLInputElement).value;
            const password = (document.getElementById('new_password') as HTMLInputElement).value;
            const data = { username, email, password };
            const validate = registerSchema.safeParse({ username, email, password });
            if (!validate.success) {
                alert(`Error : ${validate.error.errors[0].message}`);
                return;
            }

            await createUserAction({ data });
            closeCard();
            alert('User created successfully, please validate your email for continue');
        } catch (error: any) {
            console.error(error);
            alert(`Error please try again. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden ">
                    <div className="relative flex flex-col md:flex-row w-full h-[720px] md:h-[480px] ">
                        {/* Frosted glass effect background */}
                        <div className="w-full relative px-14">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl" />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            {/* Left side content */}
                            <div className="relative flex flex-col  ">
                                <Button
                                    variant={'outline'}
                                    size={'icon'}
                                    onClick={() => router.back()}
                                    className="absolute top-4 left-1 border-none text-white/70 hover:text-white  transition-colors w-14"
                                >
                                    <CircleArrowLeft /> Back
                                </Button>

                                <Tabs
                                    defaultValue={
                                        pathname.includes('register') ? 'signUp' : 'login'
                                    }
                                    className="w-full flex flex-col items-center justify-center py-24"
                                >
                                    <TabsList className="grid w-[200px] grid-cols-2 justify-center items-center">
                                        <Link href={'/register'}>
                                            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
                                        </Link>
                                        <Link href={'/login'}>
                                            <TabsTrigger value="login"> Log In</TabsTrigger>
                                        </Link>
                                    </TabsList>
                                    <TabsContent value="signUp">
                                        <Card className="bg-transparent justify-between  items-center space-y-24">
                                            {!isCardOpen && (
                                                <CardHeader className="mt-24">
                                                    <Button
                                                        disabled={isLoading}
                                                        variant={'default'}
                                                        className={cx(
                                                            'flex items-center justify-center w-full bg-[#F0B90B] hover:bg-[#262626] text-slate-700 hover:text-white',
                                                            {
                                                                'opacity-50 cursor-not-allowed':
                                                                    isLoading,
                                                            }
                                                        )}
                                                        onClick={() => openCard()}
                                                    >
                                                        Register with your Email 📨
                                                    </Button>
                                                </CardHeader>
                                            )}

                                            {isCardOpen && (
                                                <CardContent className="space-y-6 mt-24 w-full">
                                                    <div className="relative ">
                                                        <Input
                                                            id="username"
                                                            type="text"
                                                            className="w-full bg-white rounded-t-md border-none text-slate-700"
                                                            placeholder="Name"
                                                            aria-label="User name"
                                                        />
                                                    </div>

                                                    <div className="relative ">
                                                        <Input
                                                            id="new_email"
                                                            type="email"
                                                            className="w-full bg-white rounded-t-md border-none text-slate-700"
                                                            placeholder="Email"
                                                            aria-label="Email address"
                                                        />
                                                    </div>
                                                    <div className="relative ">
                                                        <Input
                                                            id="new_password"
                                                            type={
                                                                showPassword ? 'text' : 'password'
                                                            }
                                                            className="w-full bg-white rounded-t-md border-none text-slate-700"
                                                            placeholder="Password"
                                                            aria-label="Password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(!showPassword)
                                                            }
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                                            aria-label={
                                                                showPassword
                                                                    ? 'Hide password'
                                                                    : 'Show password'
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff size={20} />
                                                            ) : (
                                                                <Eye size={20} />
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div className="relative">
                                                        <Button
                                                            disabled={isLoading}
                                                            onClick={createUser}
                                                            className={cx(
                                                                'flex items-center justify-center w-full bg-[#F0B90B] hover:bg-[#262626] text-slate-700 hover:text-white',
                                                                {
                                                                    'opacity-50 cursor-not-allowed':
                                                                        isLoading,
                                                                }
                                                            )}
                                                        >
                                                            {isLoading ? (
                                                                <>
                                                                    <Loader2
                                                                        className={
                                                                            'mr-2 h-4 w-4 animate-spin'
                                                                        }
                                                                    />
                                                                    Sending...
                                                                </>
                                                            ) : (
                                                                'Create 🎫'
                                                            )}
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            )}

                                            <CardFooter className="justify-center items-center">
                                                <CardDescription className="text-white text-center mt-4">
                                                    For any questions, reach out to
                                                    support@Quickbetdmovies.com
                                                </CardDescription>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="login">
                                        <Card className="bg-transparent w-full flex flex-col items-center justify-center">
                                            <CardContent className="space-y-6 mt-24 w-full">
                                                <CardDescription className="text-white text-center">
                                                    We love having you back
                                                </CardDescription>

                                                <div className="relative ">
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        className="w-full bg-white rounded-t-md border-none text-slate-700"
                                                        placeholder="Email"
                                                        aria-label="Email address"
                                                    />
                                                </div>
                                                <div className="relative ">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="w-full bg-white rounded-t-md border-none text-slate-700"
                                                        placeholder="Password"
                                                        aria-label="Password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                                        aria-label={
                                                            showPassword
                                                                ? 'Hide password'
                                                                : 'Show password'
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="relative flex flex-col justify-center items-center">
                                                <Button
                                                    disabled={isLoading}
                                                    className={cx(
                                                        ' flex items-center justify-center w-full bg-[#F0B90B] hover:bg-[#262626] text-slate-700 hover:text-white',
                                                        {
                                                            'opacity-50 cursor-not-allowed':
                                                                isLoading,
                                                        }
                                                    )}
                                                    onClick={fetchAuthLogin}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2
                                                                className={
                                                                    'mr-2 h-4 w-4 animate-spin'
                                                                }
                                                            />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        'Continue 🎞️'
                                                    )}
                                                </Button>
                                                <CardDescription className="text-white text-center mt-4">
                                                    For any questions, reach out to
                                                    support@Quickbetdmovies.com
                                                </CardDescription>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        {/* Right side - Image section */}
                        {!routeLogin ? (
                            <div className="hidden lg:flex w-full md:w-[2/3] bg-[#1C1C1C] p-8 items-center justify-center">
                                <div className="max-w-2xl w-full flex flex-col items-center">
                                    <div className="text-center space-y-4 mt-24 z-10">
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mt-16">
                                            Welcome to Quickbet Movies!
                                        </h1>
                                        <p className="text-lg text-white/70 max-w-md mx-auto">
                                            🎬 Ready to unlock a universe of cinematic delights?
                                            Sign up now and start your journey with us!
                                        </p>
                                    </div>

                                    <div className="w-full h-96 bg-background_sign_up bg-cover bg-center md:bg-[length:170%] md:bg-[top] rounded-lg" />
                                </div>
                            </div>
                        ) : (
                            <div className="hidden lg:flex w-full md:w-[2/3] bg-[#1C1C1C] p-8 items-center justify-center">
                                <div className="max-w-2xl w-full flex flex-col items-center">
                                    <div className="text-center space-y-4 mt-24 z-10">
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mt-16">
                                            Welcome back to Quickbet Movies!
                                        </h1>
                                        <p className="text-lg text-white/70 max-w-md mx-auto">
                                            🍿 Ready to dive into the world of unlimited
                                            entertainment? Enter your credentials and let the
                                            cinematic adventure begin!
                                        </p>
                                    </div>

                                    <div className="w-full h-96 bg-background_log_in bg-cover bg-center md:bg-[length:130%] md:bg-[top] rounded-lg" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
