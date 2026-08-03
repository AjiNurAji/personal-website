import { Button } from '@/Components/UI/button';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Button>;

export default function PrimaryButton({ className = '', children, ...props }: Props) {
    return (
        <Button {...props} className={className}>
            {children}
        </Button>
    );
}
