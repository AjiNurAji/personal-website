import { Link, type InertiaLinkProps } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/UI/dropdown-menu';

function DropdownRoot({ children }: { children: React.ReactNode }) {
    return <DropdownMenu>{children}</DropdownMenu>;
}

function Trigger({ children }: { children: React.ReactNode }) {
    return <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>;
}

function Content({ children }: { children: React.ReactNode }) {
    return <DropdownMenuContent align="end">{children}</DropdownMenuContent>;
}

function DropdownLink({ children, ...props }: InertiaLinkProps) {
    return (
        <DropdownMenuItem asChild>
            <Link {...props} className="w-full cursor-pointer">
                {children}
            </Link>
        </DropdownMenuItem>
    );
}

DropdownRoot.Trigger = Trigger;
DropdownRoot.Content = Content;
DropdownRoot.Link = DropdownLink;

export default DropdownRoot;
