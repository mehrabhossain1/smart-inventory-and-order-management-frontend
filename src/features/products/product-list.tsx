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
                    <Skeleton key={i} className="h-12 rounded-lg"/>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Threshold</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        {isAdmin && <TableHead className="w-24">Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => {
                        const categoryName =
                            typeof product.category === "object" ? product.category.name : "—";
                        const isLowStock = product.quantity > 0 && product.quantity <= product.minimumStockThreshold;

                        return (
                            <TableRow key={product._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {product.name}
                                        {isLowStock && (
                                            <AlertTriangle className="size-4 text-amber-500"/>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-500">{categoryName}</TableCell>
                                <TableCell>{formatCurrency(product.price)}</TableCell>
                                <TableCell className="font-mono">{product.quantity}</TableCell>
                                <TableCell className="font-mono">{product.minimumStockThreshold}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusColors[product.status] || ""}>
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-500">{formatDate(product.createdAt)}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(product)} className="size-8">
                                                <Pencil className="size-4"/>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="size-4"/>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete &quot;{product.name}&quot;? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(product._id)} className="bg-red-600 hover:bg-red-700">
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
