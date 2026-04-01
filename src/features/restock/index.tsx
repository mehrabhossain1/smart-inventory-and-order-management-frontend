"use client";

import {useState} from "react";
import {useAuthStore} from "@/store/auth-store";
import {useRestock} from "./use-restock";
import {RestockList} from "./restock-list";
import {RestockDialog} from "./restock-dialog";
import type {RestockQueueItem} from "@/shared/types";

export default function RestockPage() {
    const {user} = useAuthStore();
    const isAdmin = user?.role === "admin";
    const {queue, loading, refetch} = useRestock();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<RestockQueueItem | null>(null);

    const handleRestock = (item: RestockQueueItem) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-500">{queue.length} items need restocking</p>

            <RestockList
                queue={queue}
                loading={loading}
                isAdmin={isAdmin}
                onRestock={handleRestock}
                onRefresh={refetch}
            />

            <RestockDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                item={selectedItem}
                onSuccess={refetch}
            />
        </div>
    );
}
