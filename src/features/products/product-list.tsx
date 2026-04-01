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
import {Pencil, Trash2, AlertTriangle} from "lucide-react";
import type {Product} from "@/shared/types";
import {formatCurrency, formatDate} from "@/helpers";
import {statusColors} from "@/helpers/constant";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

interface ProductListProps {
    products: Product[];
    loading: boolean;
    isAdmin: boolean;
    onEdit: (product: Product) => void;
    onRefresh: () => void;
}

export function ProductList({products, loading, isAdmin, onEdit, onRefresh}: ProductListProps) {
    const handleDelete = async (id: string) => {
        try {
            await apiClient.del(API_ENDPOINTS.products.byId(id));
            toast.success("Product deleted successfully");
            onRefresh();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete product");
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

    if (products.length === 0) {
        return (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Name</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Category</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Price</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Qty</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Threshold</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Status</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Created</TableHead>
                        {isAdmin && <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold w-24">Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => {
                        const categoryName =
                            typeof product.category === "object" ? product.category.name : "—";
                        const isLowStock = product.quantity > 0 && product.quantity <= product.minimumStockThreshold;

                        return (
                            <TableRow key={product._id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-medium text-slate-700">
                                    <div className="flex items-center gap-2">
                                        {product.name}
                                        {isLowStock && (
                                            <AlertTriangle className="size-3.5 text-amber-500"/>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-400 text-sm">{categoryName}</TableCell>
                                <TableCell className="text-slate-600 tabular-nums">{formatCurrency(product.price)}</TableCell>
                                <TableCell className="tabular-nums font-medium text-slate-600">{product.quantity}</TableCell>
                                <TableCell className="tabular-nums text-slate-400">{product.minimumStockThreshold}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`text-[11px] font-medium px-2.5 ${statusColors[product.status] || ""}`}>
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-400 text-sm">{formatDate(product.createdAt)}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(product)}
                                                    className="size-8 rounded-lg text-slate-400 hover:text-primary-light hover:bg-primary-light/5">
                                                <Pencil className="size-3.5"/>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            className="size-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50">
                                                        <Trash2 className="size-3.5"/>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="rounded-2xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete &quot;{product.name}&quot;?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(product._id)}
                                                                          className="bg-red-500 hover:bg-red-600 rounded-xl">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
