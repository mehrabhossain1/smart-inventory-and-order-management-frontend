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
                    <Skeleton key={i} className="h-12 rounded-lg"/>
                ))}
            </div>
        );
    }

    if (queue.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No items in the restock queue. All products are well-stocked!</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Threshold</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {queue.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium">{item.product.name}</TableCell>
                            <TableCell className="font-mono">{item.currentStock}</TableCell>
                            <TableCell className="font-mono">{item.threshold}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={priorityColors[item.priority] || ""}>
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
                                            className="text-primary-light hover:text-primary-light/80"
                                        >
                                            <PackagePlus className="size-4 mr-1"/>
                                            Restock
                                        </Button>
                                    )}
                                    {isAdmin && (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon"
                                                        className="size-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="size-4"/>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Remove from Queue</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Remove &quot;{item.product.name}&quot; from the restock queue?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleRemove(item._id)} className="bg-red-600 hover:bg-red-700">
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
