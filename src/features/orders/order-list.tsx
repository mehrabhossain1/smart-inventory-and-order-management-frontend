"use client";

import Link from "next/link";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";
import type {Order} from "@/shared/types";
import {formatCurrency, formatDate, truncateId} from "@/helpers";
import {OrderStatusBadge} from "./order-status-badge";
import {Skeleton} from "@/components/ui/skeleton";
import {PATHS} from "@/config/paths";

interface OrderListProps {
    orders: Order[];
    loading: boolean;
}

export function OrderList({orders, loading}: OrderListProps) {
    if (loading) {
        return (
            <div className="space-y-3">
                {Array.from({length: 5}).map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded-lg"/>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-20">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-mono text-sm">{truncateId(order._id)}</TableCell>
                            <TableCell className="font-medium">{order.customerName}</TableCell>
                            <TableCell>{order.products.length} item(s)</TableCell>
                            <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                            <TableCell><OrderStatusBadge status={order.status}/></TableCell>
                            <TableCell className="text-gray-500">{formatDate(order.createdAt)}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" className="size-8" asChild>
                                    <Link href={PATHS.dashboard.orderDetail(order._id)}>
                                        <Eye className="size-4"/>
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
