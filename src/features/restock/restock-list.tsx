"use client";

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {PackagePlus, Trash2} from "lucide-react";
import type {RestockQueueItem} from "@/shared/types";
import {priorityColors} from "@/helpers/constant";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

interface RestockListProps {
    queue: RestockQueueItem[];
    loading: boolean;
    isAdmin: boolean;
    onRestock: (item: RestockQueueItem) => void;
    onRefresh: () => void;
}

export function RestockList({queue, loading, isAdmin, onRestock, onRefresh}: RestockListProps) {
    const handleRemove = async (id: string) => {
        try {
            await apiClient.del(API_ENDPOINTS.restock.remove(id));
            toast.success("Removed from restock queue");
            onRefresh();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to remove");
        }
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {Array.from({length: 5}).map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-xl"/>
                ))}
            </div>
        );
    }

    if (queue.length === 0) {
        return (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
                <p>No items in the restock queue. All products are well-stocked!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Product</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Stock</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Threshold</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Priority</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold w-40">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {queue.map((item) => (
                        <TableRow key={item._id} className="hover:bg-slate-50/50 transition-colors">
                            <TableCell className="font-medium text-slate-700">{item.product.name}</TableCell>
                            <TableCell className="tabular-nums font-medium text-slate-600">{item.currentStock}</TableCell>
                            <TableCell className="tabular-nums text-slate-400">{item.threshold}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`text-[11px] font-medium px-2.5 ${priorityColors[item.priority] || ""}`}>
                                    {item.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {isAdmin && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onRestock(item)}
                                            className="text-primary-light hover:text-primary-light/80 hover:bg-primary-light/5 rounded-lg text-xs"
                                        >
                                            <PackagePlus className="size-3.5 mr-1"/>
                                            Restock
                                        </Button>
                                    )}
                                    {isAdmin && (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon"
                                                        className="size-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50">
                                                    <Trash2 className="size-3.5"/>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="rounded-2xl">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Remove from Queue</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Remove &quot;{item.product.name}&quot; from the restock queue?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleRemove(item._id)}
                                                                      className="bg-red-500 hover:bg-red-600 rounded-xl">
                                                        Remove
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
