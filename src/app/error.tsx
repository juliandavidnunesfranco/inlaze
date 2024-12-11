'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="flex justify-center">
                    <AlertCircle className="h-24 w-24 text-destructive" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Algo salió mal</h1>
                <p className="text-lg text-muted-foreground">
                    Lo sentimos, ha ocurrido un error inesperado.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={reset} variant="default" className="w-full sm:w-auto">
                        Intentar de nuevo
                    </Button>
                    <Button
                        onClick={() => (window.location.href = '/')}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        Volver al inicio
                    </Button>
                </div>
            </div>
        </div>
    );
}
