import {AuthProvider} from "@/shared/providers/auth-provider";
import {SocketProvider} from "@/shared/providers/socket-provider";
import {Sidebar} from "@/shared/layouts/sidebar";
import {DashboardHeader} from "@/shared/layouts/dashboard-header";
import {Toaster} from "@/components/ui/sonner";
import {NotificationPanel} from "@/features/notifications/notification-panel";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SocketProvider>
                <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-[#f8fafc] to-slate-100/50 dark:from-[#0a0f1e] dark:via-slate-950 dark:to-[#0d1225]">
                    <DashboardHeader/>
                    <div className="flex flex-1 min-h-0">
                        <Sidebar/>
                        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
                            {children}
                        </main>
                    </div>
                </div>
                <NotificationPanel/>
                <Toaster richColors position="top-right"/>
            </SocketProvider>
        </AuthProvider>
    );
}
