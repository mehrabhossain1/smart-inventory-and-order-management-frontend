"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {loginSlides} from "@/helpers/constant";
import {AuthLayout} from "@/shared/layouts/auth-layout";
import {PasswordInput} from "../../components/password-input";
import {useAuthStore} from "@/store/auth-store";
import {PATHS} from "@/config/paths";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {login, demoLogin, isLoading, error, clearError} = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            router.push(PATHS.dashboard.home);
        } catch {
            // error is set in store
        }
    };

    const handleDemoLogin = async () => {
        try {
            await demoLogin();
            router.push(PATHS.dashboard.home);
        } catch {
            // error is set in store
        }
    };

    return (
        <AuthLayout slides={loginSlides}>
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-5xl font-bold text-balance leading-tight">
                    Welcome back
                </h1>
                <p className="text-base text-gray-500 max-w-2xl mx-auto">
                    Don&apos;t have an account?{" "}
                    <Link
                        href={PATHS.auth.register}
                        className="text-primary-light font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                    <button
                        onClick={clearError}
                        className="ml-2 text-red-500 hover:text-red-700 font-medium"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                <div className="space-y-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({...formData, email: e.target.value})
                        }
                        className="border-border focus-visible:ring-primary-lighter/30 py-6 !text-base"
                        required
                    />
                </div>

                <PasswordInput
                    value={formData.password}
                    onChange={(value) =>
                        setFormData({...formData, password: value})
                    }
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-light hover:bg-primary-light/90 text-white h-11 lg:h-12 text-sm lg:text-base font-semibold rounded-lg"
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="w-full h-11 lg:h-12 text-sm lg:text-base font-semibold rounded-lg"
                >
                    Demo Login
                </Button>
            </form>
        </AuthLayout>
    );
}
