import { Button } from '@/Components/UI/button';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Button>;

export default function SecondaryButton({ className = '', children, ...props }: Props) {
    return (
        <Button variant="outline" {...props} className={className}>
            {children}
        </Button>
    );
}

