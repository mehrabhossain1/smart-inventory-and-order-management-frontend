import type {Metadata} from "next";
import {Geist, Geist_Mono, Roboto, Viga} from "next/font/google";
import {ThemeProvider} from "next-themes";
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
    title: "Smart Inventory | Inventory & Order Management",
    description:
        "Smart Inventory & Order Management System — manage products, stock levels, customer orders, and fulfillment workflows with validation and conflict handling.",
    keywords: [
        "inventory management",
        "order management",
        "stock tracking",
        "restock queue",
        "product management",
        "smart inventory",
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${viga.variable} ${roboto.variable} antialiased`}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
