import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/Components/UI/button';
import { Separator } from '@/Components/UI/separator';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from '@remixicon/react';
import { PageProps } from '@/types';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage<PageProps>().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-dvh bg-muted/30 text-foreground">
            <nav className="border-b border-border/70 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <ApplicationLogo className="block h-9 w-auto text-foreground" />
                            </Link>
                            <div className="hidden sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" className="gap-1.5">
                                        {user.name}
                                        <RiArrowDownSLine className="size-4" />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden"
                            aria-label={showingNavigationDropdown ? 'Close navigation' : 'Open navigation'}
                            onClick={() => setShowingNavigationDropdown((previous) => !previous)}
                        >
                            {showingNavigationDropdown ? <RiCloseLine /> : <RiMenuLine />}
                        </Button>
                    </div>
                </div>

                {showingNavigationDropdown && (
                    <div className="border-t border-border/70 bg-background px-4 py-3 sm:hidden">
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        </div>
                        <Separator className="my-3" />
                        <div className="px-3">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="border-b border-border/70 bg-background">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

