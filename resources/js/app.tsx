import '../css/app.css';
import './bootstrap';
import "@uiw/react-md-editor/markdown-editor.css";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/Components/UI/sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <App {...props} />
                <Toaster richColors position="top-right" />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
