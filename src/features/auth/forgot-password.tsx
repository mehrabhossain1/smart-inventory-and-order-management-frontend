"use client";

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Image from "next/image";

export default function ForgotPasswordForm() {
    const [formData, setFormData] = useState({
        email: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log("Forgot Password:", formData);
        setIsSubmitted(true);
    };

    return (
        <div
            className="min-h-screen flex"
            style={{
                background:
                    "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
            }}
        >
            <div className="hidden lg:flex lg:w-1/2 p-4">
                <div
                    className="w-full h-full rounded-3xl flex items-end justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                        <Image src='/forgot_password_illustration.jpg'
                               alt={'forgot password vector'}
                               width={500}
                               height={500}
                               className='w-full h-full object-cover mask-t-from-white mask-t-from-10% rounded-xl'
                        />
                    </div>

                    <div className="absolute top-6 left-6 z-20">
                        <Link href="/" className="flex items-center space-x-2">
                            <div
                                className='relative transition-all duration-500 ease-in-out size-8'
                            >
                                <Image
                                    src="/rounded-logo.png"
                                    alt="DevJobs Network"
                                    fill
                                    className={'object-contain'}
                                    priority
                                />
                            </div>
                            <span className="text-xl font-viga text-foreground hidden sm:inline">
                            DevJobs Network
                        </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-8">
                <div className="w-full max-w-lg">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {isSubmitted ? "Check your email" : "Forgot password?"}
                        </h1>
                        <p className="text-base text-gray-600">
                            {isSubmitted ? (
                                <>
                                    We sent a password reset link to{" "}
                                    <span className="font-medium text-gray-900">
                                    {formData.email}
                                </span>
                                </>
                            ) : (
                                <>
                                    No worries, we'll send you reset instructions.{" "}
                                    <Link
                                        href="/login"
                                        className="text-primary-light font-medium hover:underline"
                                    >
                                        Back to log in
                                    </Link>
                                </>
                            )}
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <Button
                                type="submit"
                                className="w-full bg-primary-light hover:bg-primary-light/90 text-white h-12 text-base font-semibold rounded-lg"
                            >
                                Send Instructions
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <Button
                                asChild
                                className="w-full bg-primary-light hover:bg-primary-light/90 text-white h-12 text-base font-semibold rounded-lg"
                            >
                                <Link href="/login">Back to log in</Link>
                            </Button>
                            <p className="text-sm text-center text-gray-600">
                                Didn't receive the email?{" "}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-primary-light hover:underline font-medium"
                                >
                                    Click to resend
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
