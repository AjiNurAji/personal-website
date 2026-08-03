import { usePage } from "@inertiajs/react";

interface TranslationProps {
    locale?: string;
    translations?: Record<string, string>;
}

export function useTranslation() {
    const { props } = usePage<TranslationProps>();
    const locale = props.locale || "en";
    const translations = props.translations || {};

    const t = (key: string, fallback = key) => translations[key] || fallback;

    return { locale, t };
}

export const supportedLocales = [
    { code: "en", label: "EN" },
    { code: "id", label: "ID" },
] as const;
