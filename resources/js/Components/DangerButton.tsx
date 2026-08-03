import { Button } from '@/Components/UI/button';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Button>;

export default function DangerButton({ className = '', children, ...props }: Props) {
    return (
        <Button variant="destructive" {...props} className={className}>
            {children}
        </Button>
    );
}

