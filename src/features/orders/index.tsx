"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus, ChevronLeft, ChevronRight} from "lucide-react";
import {useOrders} from "./use-orders";
import {OrderList} from "./order-list";
import {OrderFilters} from "./order-filters";
import {CreateOrderDialog} from "./create-order-dialog";

export default function OrdersPage() {
    const [status, setStatus] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);

    const {orders, total, loading, refetch} = useOrders({
        status: status === "all" ? undefined : status,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page,
        limit: 10,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const totalPages = Math.ceil(total / 10);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{total} orders</p>
                <Button onClick={() => setDialogOpen(true)} className="bg-primary-light hover:bg-primary-light/90 shadow-sm shadow-primary-light/20 rounded-xl">
                    <Plus className="size-4 mr-2"/>
                    New Order
                </Button>
            </div>

            <OrderFilters
                status={status}
                onStatusChange={(v) => { setStatus(v); setPage(1); }}
                startDate={startDate}
                onStartDateChange={(v) => { setStartDate(v); setPage(1); }}
                endDate={endDate}
                onEndDateChange={(v) => { setEndDate(v); setPage(1); }}
            />

            <OrderList orders={orders} loading={loading}/>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-xl">
                        <ChevronLeft className="size-4"/>
                    </Button>
                    <span className="text-sm text-slate-500 tabular-nums px-3">{page} / {totalPages}</span>
                    <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-xl">
                        <ChevronRight className="size-4"/>
                    </Button>
                </div>
            )}

            <CreateOrderDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={refetch}/>
        </div>
    );
}
