import { Label } from '@/Components/UI/label';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Label> & { value?: string };

export default function InputLabel({ value, children, ...props }: Props) {
    return <Label {...props}>{value || children}</Label>;
}
