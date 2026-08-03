import { Link, type InertiaLinkProps } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/Components/UI/button';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={cn(
                buttonVariants({ variant: active ? 'secondary' : 'ghost', size: 'lg' }),
                'w-full justify-start rounded-md text-base font-medium',
                className,
            )}
        >
            {children}
        </Link>
    );
}
