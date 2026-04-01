import type {Metadata} from "next";
import ForgotPasswordForm from "@/features/auth/forgot-password";

export const metadata: Metadata = {
    title: "Forgot Password | DevJobs Network",
    description:
        "Reset your DevJobs Network password and regain access to your account.",
    keywords: [
        "forgot password DevJobs",
        "reset password",
        "account recovery",
        "password recovery DevJobs Network",
    ],
    openGraph: {
        title: "Forgot Password | DevJobs Network",
        description:
            "Reset your password and get back to finding your next opportunity.",
        url: "https://devjobs-network.com/forgot-password",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Forgot Password | DevJobs Network",
        description: "Reset your password securely and quickly.",
    },
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm/>;
}
