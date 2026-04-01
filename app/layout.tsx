import type {Metadata} from "next";
import {Geist, Geist_Mono, Roboto, Viga} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const viga = Viga({
    variable: "--font-viga",
    weight: "400",
    subsets: ["latin"],
});

const roboto = Roboto({
    variable: "--font-roboto",
    weight: ["400", "500", "700"],
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "DevJobs Network | Find Your Dream Developer Job",
    description:
        "DevJobs Network connects talented developers with top tech companies. Browse verified job opportunities, showcase your skills, and accelerate your career growth.",
    keywords: [
        "developer jobs",
        "tech jobs",
        "software engineering jobs",
        "remote developer jobs",
        "frontend jobs",
        "backend jobs",
        "full stack jobs",
        "DevJobs Network",
    ],
    openGraph: {
        title: "DevJobs Network | Find Your Dream Developer Job",
        description:
            "Connect with top tech companies and discover opportunities that match your skills.",
        url: "https://devjobs-network.com",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DevJobs Network | Find Your Dream Developer Job",
        description:
            "Connect with top tech companies and discover opportunities that match your skills.",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${viga.variable} ${roboto.variable} antialiased `}
        >
        {children}
        </body>
        </html>
    );
}
