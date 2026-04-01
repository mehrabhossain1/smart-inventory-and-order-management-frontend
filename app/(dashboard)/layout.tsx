import {AuthProvider} from "@/shared/providers/auth-provider";
import {Sidebar} from "@/shared/layouts/sidebar";
import {DashboardHeader} from "@/shared/layouts/dashboard-header";
import {Toaster} from "@/components/ui/sonner";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <div className="h-screen flex flex-col overflow-hidden bg-[#f8fafc]">
                <DashboardHeader/>
                <div className="flex flex-1 min-h-0">
                    <Sidebar/>
                    <main className="flex-1 overflow-y-auto p-5 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster richColors position="top-right"/>
        </AuthProvider>
    );
}
