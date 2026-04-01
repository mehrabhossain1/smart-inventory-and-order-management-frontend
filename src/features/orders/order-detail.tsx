"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
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
import {statusColors} from "@/helpers/constant";
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
                <Skeleton className="h-10 w-32"/>
                <Skeleton className="h-48 rounded-xl"/>
                <Skeleton className="h-48 rounded-xl"/>
            </div>
        );
    }

    if (!order) {
        return <p className="text-gray-500">Order not found.</p>;
    }

    const nextStatuses = statusTransitions[order.status] || [];
    const canCancel = ["Pending", "Confirmed"].includes(order.status);

    return (
        <div className="space-y-6">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(PATHS.dashboard.orders)}
                className="text-gray-500"
            >
                <ArrowLeft className="size-4 mr-1"/>
                Back to Orders
            </Button>

            <Card className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order #{order._id.slice(-6)}
                        </h2>
                        <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                    </div>
                    <OrderStatusBadge status={order.status}/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{order.customerName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium text-lg">{formatCurrency(order.totalPrice)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Created By</p>
                        <p className="font-medium">
                            {typeof order.createdBy === "object" ? order.createdBy.username : "—"}
                        </p>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Items</h3>
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.products.map((item, i) => {
                                const productName = typeof item.product === "object" ? item.product.name : "Product";
                                return (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{productName}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{formatCurrency(item.price)}</TableCell>
                                        <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {(nextStatuses.length > 0 || canCancel) && (
                <Card className="p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Actions</h3>
                    <div className="flex flex-wrap gap-2">
                        {nextStatuses.map((status) => (
                            <Button
                                key={status}
                                onClick={() => handleStatusUpdate(status)}
                                disabled={actionLoading}
                                className="bg-primary-light hover:bg-primary-light/90"
                            >
                                Mark as {status}
                            </Button>
                        ))}
                        {canCancel && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" disabled={actionLoading}
                                            className="text-red-600 border-red-200 hover:bg-red-50">
                                        <Ban className="size-4 mr-1"/>
                                        Cancel Order
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to cancel this order? Stock will be restored for all items.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Keep Order</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
                                            Cancel Order
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
