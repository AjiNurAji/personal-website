import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Checkbox } from '@/Components/UI/checkbox';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/Components/UI/field";
import { RiLoginCircleLine, RiInformationLine } from '@remixicon/react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-medium">
                    <RiInformationLine className="size-4" />
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <FieldContent>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <FieldError errors={[errors.email]} />}
                    </FieldContent>
                </Field>

                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel>Password</FieldLabel>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <FieldContent>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <FieldError errors={[errors.password]} />}
                    </FieldContent>
                </Field>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) =>
                            setData('remember', checked as boolean)
                        }
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Remember me for 30 days
                    </label>
                </div>

                <Button className="w-full h-11 text-sm font-semibold gap-2" disabled={processing}>
                    {processing ? (
                        <span className="animate-pulse">Authenticating...</span>
                    ) : (
                        <>
                            <RiLoginCircleLine className="size-4" />
                            Sign In
                        </>
                    )}
                </Button>
            </form>
        </GuestLayout>
    );
}
