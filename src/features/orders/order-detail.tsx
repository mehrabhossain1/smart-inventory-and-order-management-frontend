"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {ArrowLeft, Ban} from "lucide-react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {Order} from "@/shared/types";
import {formatCurrency, formatDateTime} from "@/helpers";
import {OrderStatusBadge} from "./order-status-badge";
import {Skeleton} from "@/components/ui/skeleton";
import {PATHS} from "@/config/paths";
import {toast} from "sonner";

const statusTransitions: Record<string, string[]> = {
    Pending: ["Confirmed"],
    Confirmed: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: [],
    Cancelled: [],
};

export default function OrderDetailPage({orderId}: { orderId: string }) {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const router = useRouter();

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const data = await apiClient.get<{ order: Order }>(API_ENDPOINTS.orders.byId(orderId));
            setOrder(data.order || data as unknown as Order);
        } catch {
            toast.error("Failed to load order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    const handleStatusUpdate = async (newStatus: string) => {
        setActionLoading(true);
        try {
            await apiClient.put(API_ENDPOINTS.orders.status(orderId), {status: newStatus});
            toast.success(`Order status updated to ${newStatus}`);
            fetchOrder();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update status");
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancel = async () => {
        setActionLoading(true);
        try {
            await apiClient.put(API_ENDPOINTS.orders.cancel(orderId));
            toast.success("Order cancelled successfully");
            fetchOrder();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to cancel order");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-32 rounded-xl"/>
                <Skeleton className="h-56 rounded-2xl"/>
                <Skeleton className="h-24 rounded-2xl"/>
            </div>
        );
    }

    if (!order) {
        return <p className="text-slate-400">Order not found.</p>;
    }

    const nextStatuses = statusTransitions[order.status] || [];
    const canCancel = ["Pending", "Confirmed"].includes(order.status);

    return (
        <div className="space-y-6">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(PATHS.dashboard.orders)}
                className="text-slate-400 hover:text-slate-600 rounded-xl"
            >
                <ArrowLeft className="size-4 mr-1"/>
                Back to Orders
            </Button>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Order #{order._id.slice(-6)}
                        </h2>
                        <p className="text-sm text-slate-400 mt-0.5">{formatDateTime(order.createdAt)}</p>
                    </div>
                    <OrderStatusBadge status={order.status}/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Customer</p>
                        <p className="font-medium text-slate-700 mt-1">{order.customerName}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Total</p>
                        <p className="font-bold text-lg text-slate-800 mt-1">{formatCurrency(order.totalPrice)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Created By</p>
                        <p className="font-medium text-slate-700 mt-1">
                            {typeof order.createdBy === "object" ? order.createdBy.username : "—"}
                        </p>
                    </div>
                </div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Order Items</h3>
                <div className="rounded-xl border border-slate-100 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Product</TableHead>
                                <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Quantity</TableHead>
                                <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Unit Price</TableHead>
                                <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.products.map((item, i) => {
                                const productName = typeof item.product === "object" ? item.product.name : "Product";
                                return (
                                    <TableRow key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-medium text-slate-700">{productName}</TableCell>
                                        <TableCell className="tabular-nums text-slate-500">{item.quantity}</TableCell>
                                        <TableCell className="tabular-nums text-slate-500">{formatCurrency(item.price)}</TableCell>
                                        <TableCell className="tabular-nums font-medium text-slate-600">{formatCurrency(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {(nextStatuses.length > 0 || canCancel) && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        {nextStatuses.map((status) => (
                            <Button
                                key={status}
                                onClick={() => handleStatusUpdate(status)}
                                disabled={actionLoading}
                                className="bg-primary-light hover:bg-primary-light/90 shadow-sm shadow-primary-light/20 rounded-xl"
                            >
                                Mark as {status}
                            </Button>
                        ))}
                        {canCancel && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" disabled={actionLoading}
                                            className="text-red-500 border-red-200 hover:bg-red-50 rounded-xl">
                                        <Ban className="size-4 mr-1"/>
                                        Cancel Order
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-2xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure? Stock will be restored for all items.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-xl">Keep Order</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleCancel} className="bg-red-500 hover:bg-red-600 rounded-xl">
                                            Cancel Order
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
