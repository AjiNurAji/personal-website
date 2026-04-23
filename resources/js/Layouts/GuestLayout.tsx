import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { InteractiveCursor } from '@/Components/Elements/InteractiveCursor';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <InteractiveCursor />
            
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="w-full sm:max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="mb-2">
                        <img src="/ana.svg" alt="Logo" className="size-16" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
                    <p className="text-sm text-muted-foreground">Welcome back, Captain.</p>
                </div>
                
                <div className="overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl rounded-2xl">
                    {children}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
