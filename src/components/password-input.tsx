"use client";

import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {Input} from "@/components/ui/input";

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
};

export function PasswordInput({
                                  value,
                                  onChange,
                                  placeholder = "Enter your password",
                                  required = true,
                              }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border-border focus-visible:ring-primary-lighter/30 py-6 !text-base"
                required={required}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
                {showPassword ? (
                    <EyeOff className="w-5 h-5"/>
                ) : (
                    <Eye className="w-5 h-5"/>
                )}
            </button>
        </div>
    );
}
