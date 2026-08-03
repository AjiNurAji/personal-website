import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/Components/UI/card';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Profile</h2>}>
            <Head title="Profile" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <Card><CardContent className="p-6 sm:p-8"><UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" /></CardContent></Card>
                    <Card><CardContent className="p-6 sm:p-8"><UpdatePasswordForm className="max-w-xl" /></CardContent></Card>
                    <Card><CardContent className="p-6 sm:p-8"><DeleteUserForm className="max-w-xl" /></CardContent></Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
