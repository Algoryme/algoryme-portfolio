'use client';

import { useEffect } from 'react';

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
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-neutral-950">
            <div className="text-center max-w-md">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                    Something went wrong!
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                    An error occurred while processing your request.
                </p>
                <button
                    onClick={reset}
                    className="inline-block px-8 py-4 rounded-lg font-semibold text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
