import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/favorites', '/popular'];
const publicRoutes = ['/login', '/register', '/', '/search'];

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const sessionId = req.cookies.get('session')?.value;

    // Redirección para rutas protegidas sin session en appwrite
    if (protectedRoutes.includes(path) && !sessionId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Redirección para rutas públicas cuando hay session activa en appwrite
    if (publicRoutes.includes(path) && sessionId) {
        if (path === '/login' || path === '/register') {
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }
    }

    // Permitir otras rutas
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
