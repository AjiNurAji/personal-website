import { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
} from '@/Components/UI/dialog';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}: {
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeable?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}) {
    useEffect(() => {
        if (!closeable && show) return;
    }, [closeable, show]);

    const widths = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    };

    return (
        <Dialog open={show} onOpenChange={(open) => !open && closeable && onClose()}>
            <DialogContent className={widths[maxWidth]}>{children}</DialogContent>
        </Dialog>
    );
}
