import { FieldError } from '@/Components/UI/field';

export default function InputError({ message, className = '' }: { message?: string; className?: string }) {
    return <FieldError className={className} errors={message ? [message] : undefined} />;
}
