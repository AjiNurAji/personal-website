import { Link, type InertiaLinkProps } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/Components/UI/button';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={cn(
                buttonVariants({ variant: active ? 'secondary' : 'ghost', size: 'default' }),
                'rounded-md text-sm font-medium',
                className,
            )}
        >
            {children}
        </Link>
    );
}
