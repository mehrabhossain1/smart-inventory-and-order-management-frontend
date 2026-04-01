import {AuthProvider} from "@/shared/providers/auth-provider";
import {Sidebar} from "@/shared/layouts/sidebar";
import {DashboardHeader} from "@/shared/layouts/dashboard-header";
import {Toaster} from "@/components/ui/sonner";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <DashboardHeader/>
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar/>
                    <main className="flex-1 p-4 lg:p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster richColors position="top-right"/>
        </AuthProvider>
    );
}
