"use client";

import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";

type SocialLoginButtonsProps = {
    dividerText?: string;
};

export function SocialLoginButtons({
                                       dividerText = "Or",
                                   }: SocialLoginButtonsProps) {
    const handleGoogleLogin = () => {
        // Handle Google login
        console.log("Google login");
    };

    const handleGithubLogin = () => {
        // Handle Github login
        console.log("Github login");
    };

    return (
        <>
            <div className="flex items-center my-6 lg:my-8">
                <hr className='w-full h-[1px] bg-border mask-l-from-white border-none'/>
                <span className="px-4 text-sm text-muted-foreground">
                    {dividerText}
                </span>
                <hr className='w-full h-[1px] bg-border mask-r-from-white border-none'/>
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="border-border w-full py-6"
            >
                <Icon
                    icon="flat-color-icons:google"
                    className="w-6.5 h-6.5 mr-1"
                />
                Continue with Google
            </Button>
        </>
    );
}
