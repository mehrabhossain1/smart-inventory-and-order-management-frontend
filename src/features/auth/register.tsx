"use client";

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {registerSlides} from "@/helpers/constant";
import {AuthLayout} from "@/shared/layouts/auth-layout";
import {PasswordInput} from "../../components/password-input";
import {SocialLoginButtons} from "./social-login-buttons";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        agreedToTerms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        console.log("Register:", formData);
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
                        href="/login"
                        className="text-primary-light font-medium hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">

                <Input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            firstName: e.target.value,
                        })
                    }
                    className="border-border focus-visible:ring-primary-lighter/30 py-6 !text-base"
                    required
                />

                <div className="grid grid-cols-2 gap-3 lg:gap-4">
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
                    <Select
                        value={''}
                    >
                        <SelectTrigger
                            className='w-full py-6 border-border focus-visible:ring-primary-lighter/30'>
                            <SelectValue placeholder="Select category"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                            <SelectItem value="backend-developer">Backend Developer</SelectItem>
                            <SelectItem value="fullstack-developer">Full Stack Developer</SelectItem>
                            <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                            <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                            <SelectItem value="data-scientist">Data Scientist</SelectItem>
                            <SelectItem value="cyber-security">Cyber Security Engineer</SelectItem>
                            <SelectItem value="product-manager">Product Manager</SelectItem>

                        </SelectContent>
                    </Select>
                </div>

                <PasswordInput
                    value={formData.password}
                    onChange={(value) =>
                        setFormData({...formData, password: value})
                    }
                />

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        checked={formData.agreedToTerms}
                        onCheckedChange={(checked) =>
                            setFormData({
                                ...formData,
                                agreedToTerms: checked === true,
                            })
                        }
                    />
                    <Label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground gap-1 cursor-pointer"
                    >
                        I agree to the
                        <Link
                            href="/terms"
                            className="text-primary-light hover:underline"
                        >
                            Terms & Conditions
                        </Link>
                    </Label>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary-light hover:bg-primary-light/90 text-white h-11 lg:h-12 text-sm lg:text-base font-semibold rounded-lg"
                    disabled={!formData.agreedToTerms}
                >
                    Create account
                </Button>

                <SocialLoginButtons dividerText="Or"/>
            </form>
        </AuthLayout>
    );
}
