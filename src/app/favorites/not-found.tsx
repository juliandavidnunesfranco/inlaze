import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="flex justify-center">
                    <Search className="h-24 w-24 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">404 - Página no encontrada</h1>
                <p className="text-lg text-muted-foreground">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="default" className="w-full sm:w-auto">
                        <Link href="/">Volver al inicio</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href="/search">Ir a búsqueda</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
