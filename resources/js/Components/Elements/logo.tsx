import { Link } from "@inertiajs/react";
import { SafeImage } from "./SafeImage";
const APP_URL = import.meta.env.VITE_APP_URL || "https://aji.dev";

export const Logo = () => {
    return (
    <Link
        href="/"
        className="group inline-flex items-center gap-1.5"
        aria-label="Aji Nur Aji homepage"
    >
        <SafeImage src={`${APP_URL}/ana.png`} alt="Aji Nur Aji logo" className="h-10 w-10 group-hover:scale-105" />

        <span className="whitespace-nowrap text-lg font-black tracking-tighter text-foreground transition-colors group-hover:text-primary">
            aji<span className="text-muted-foreground">.</span>dev
        </span>
    </Link>
    );
};
