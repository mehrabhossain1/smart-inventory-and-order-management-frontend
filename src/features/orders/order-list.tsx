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
                    <Skeleton key={i} className="h-14 rounded-xl"/>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Order ID</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Customer</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Items</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Total</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Status</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Date</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold w-20">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <TableCell className="font-mono text-xs text-slate-400 dark:text-slate-500">{truncateId(order._id)}</TableCell>
                            <TableCell className="font-medium text-slate-700 dark:text-slate-300">{order.customerName}</TableCell>
                            <TableCell className="text-slate-500 dark:text-slate-400">{order.products.length} item(s)</TableCell>
                            <TableCell className="tabular-nums font-medium text-slate-600 dark:text-slate-400">{formatCurrency(order.totalPrice)}</TableCell>
                            <TableCell><OrderStatusBadge status={order.status}/></TableCell>
                            <TableCell className="text-slate-400 dark:text-slate-500 text-sm">{formatDate(order.createdAt)}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon"
                                        className="size-8 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-light hover:bg-primary-light/5"
                                        asChild>
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
