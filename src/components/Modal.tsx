'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={onDismiss}
                className="bg-transparent p-4 backdrop:bg-transparent relative z-50 rounded-2xl overflow-visible"
            >
                {children}
            </dialog>
        </>
    );
}
