"use client";

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {loginSlides} from "@/helpers/constant";
import {AuthLayout} from "@/shared/layouts/auth-layout";
import {PasswordInput} from "../../components/password-input";
import {SocialLoginButtons} from "./social-login-buttons";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login:", formData);
    };

    return (
        <AuthLayout slides={loginSlides}>
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-5xl font-bold text-balance leading-tight">
                    Welcome back
                </h1>
                <p className="text-base text-gray-500 max-w-2xl mx-auto">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-primary-light font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                <div className="space-y-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
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

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) =>
                                setFormData({
                                    ...formData,
                                    rememberMe: checked === true,
                                })
                            }
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm text-muted-foreground font-normal cursor-pointer"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary-light hover:underline transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary-light hover:bg-primary-light/90 text-white h-11 lg:h-12 text-sm lg:text-base font-semibold rounded-lg"
                >
                    Log in
                </Button>

                <SocialLoginButtons dividerText="Or"/>
            </form>
        </AuthLayout>
    );
}
