"use client";

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Pencil, Trash2} from "lucide-react";
import type {Category} from "@/shared/types";
import {formatDate} from "@/helpers";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

interface CategoryListProps {
    categories: Category[];
    loading: boolean;
    isAdmin: boolean;
    onEdit: (category: Category) => void;
    onRefresh: () => void;
}

export function CategoryList({categories, loading, isAdmin, onEdit, onRefresh}: CategoryListProps) {
    const handleDelete = async (id: string) => {
        try {
            await apiClient.del(API_ENDPOINTS.categories.byId(id));
            toast.success("Category deleted successfully");
            onRefresh();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete category");
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

    if (categories.length === 0) {
        return (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
                <p>No categories found. Create one to get started.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Name</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Created</TableHead>
                        {isAdmin && <TableHead className="text-xs uppercase tracking-wider text-slate-400 font-semibold w-24">Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category._id} className="hover:bg-slate-50/50 transition-colors">
                            <TableCell className="font-medium text-slate-700">{category.name}</TableCell>
                            <TableCell className="text-slate-400 text-sm">{formatDate(category.createdAt)}</TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(category)}
                                            className="size-8 rounded-lg text-slate-400 hover:text-primary-light hover:bg-primary-light/5"
                                        >
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
                                                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete &quot;{category.name}&quot;? Categories with existing products cannot be deleted.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(category._id)}
                                                        className="bg-red-500 hover:bg-red-600 rounded-xl"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
