import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/UI/card';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4 text-foreground">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.08),transparent_35%)]" />
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="mb-4 inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <img src="/ana.svg" alt="Logo" className="size-16" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Welcome back, Captain.</p>
                </div>
                <Card className="border-border/70 shadow-xl">
                    <CardHeader>
                        <CardTitle className="sr-only">Authentication</CardTitle>
                        <CardDescription className="sr-only">Login form</CardDescription>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

