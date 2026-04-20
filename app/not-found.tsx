import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-neutral-950">
            <div className="text-center max-w-md">
                <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 dark:text-white mb-4">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-4 rounded-lg font-semibold text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
