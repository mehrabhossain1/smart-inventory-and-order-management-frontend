import {AuthProvider} from "@/shared/providers/auth-provider";
import {Sidebar} from "@/shared/layouts/sidebar";
import {DashboardHeader} from "@/shared/layouts/dashboard-header";
import {Toaster} from "@/components/ui/sonner";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <div className="min-h-screen flex bg-gray-50">
                <Sidebar/>
                <div className="flex-1 flex flex-col min-w-0">
                    <DashboardHeader/>
                    <main className="flex-1 p-4 lg:p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster richColors position="top-right"/>
        </AuthProvider>
    );
}
