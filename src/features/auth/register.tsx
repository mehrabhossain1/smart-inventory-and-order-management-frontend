"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {registerSlides} from "@/helpers/constant";
import {AuthLayout} from "@/shared/layouts/auth-layout";
import {PasswordInput} from "../../components/password-input";
import {useAuthStore} from "@/store/auth-store";
import {PATHS} from "@/config/paths";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "manager" as "admin" | "manager",
    });
    const {register, isLoading, error, clearError} = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password, formData.role);
            router.push(PATHS.auth.login);
        } catch {
            // error is set in store
        }
    };

    return (
        <AuthLayout slides={registerSlides}>
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-5xl font-bold text-balance leading-tight">
                    Create an account
                </h1>
                <p className="text-base text-gray-500 max-w-2xl mx-auto">
                    Already have an account?{" "}
                    <Link
                        href={PATHS.auth.login}
                        className="text-primary-light font-medium hover:underline"
                    >
                        Log in
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
                <Input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({...formData, username: e.target.value})
                    }
                    className="border-border focus-visible:ring-primary-lighter/30 py-6 !text-base"
                    required
                />

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

                <Select
                    value={formData.role}
                    onValueChange={(value) =>
                        setFormData({...formData, role: value as "admin" | "manager"})
                    }
                >
                    <SelectTrigger className="w-full py-6 border-border focus-visible:ring-primary-lighter/30">
                        <SelectValue placeholder="Select role"/>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>

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
                    {isLoading ? "Creating account..." : "Create account"}
                </Button>
            </form>
        </AuthLayout>
    );
}
