import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Input } from '@/Components/UI/input';

const TextInput = forwardRef<HTMLInputElement, React.ComponentProps<typeof Input> & { isFocused?: boolean }>(
    ({ isFocused = false, ...props }, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

        useEffect(() => {
            if (isFocused) localRef.current?.focus();
        }, [isFocused]);

        return <Input {...props} ref={localRef} />;
    },
);

TextInput.displayName = 'TextInput';

export default TextInput;
