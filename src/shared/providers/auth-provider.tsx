"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/auth-store";

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [hydrated, setHydrated] = useState(false);
    const {isAuthenticated, loadFromStorage} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        loadFromStorage();
        requestAnimationFrame(() => setHydrated(true));
    }, [loadFromStorage]);

    useEffect(() => {
        if (hydrated && !isAuthenticated) {
            router.replace("/login");
        }
    }, [hydrated, isAuthenticated, router]);

    if (!hydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 border-3 border-primary-light border-t-transparent rounded-full animate-spin"/>
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
