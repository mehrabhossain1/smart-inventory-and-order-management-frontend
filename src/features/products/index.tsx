"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus, ChevronLeft, ChevronRight} from "lucide-react";
import {useDebounce} from "@/lib/use-debounce";
import {useAuthStore} from "@/store/auth-store";
import {useProducts} from "./use-products";
import {useCategories} from "@/features/categories/use-categories";
import {ProductList} from "./product-list";
import {ProductFilters} from "./product-filters";
import {ProductFormDialog} from "./product-form-dialog";
import type {Product} from "@/shared/types";

export default function ProductsPage() {
    const {user} = useAuthStore();
    const isAdmin = user?.role === "admin";

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);

    const {products, total, loading, refetch} = useProducts({
        search: debouncedSearch,
        category: category === "all" ? undefined : category,
        status: status === "all" ? undefined : status,
        page,
        limit: 10,
    });
    const {categories} = useCategories();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const totalPages = Math.ceil(total / 10);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setDialogOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400 dark:text-slate-500">{total} products</p>
                {isAdmin && (
                    <Button onClick={handleAdd} className="bg-primary-light hover:bg-primary-light/90 shadow-sm shadow-primary-light/20 rounded-xl">
                        <Plus className="size-4 mr-2"/>
                        Add Product
                    </Button>
                )}
            </div>

            <ProductFilters
                search={search}
                onSearchChange={(v) => { setSearch(v); setPage(1); }}
                category={category}
                onCategoryChange={(v) => { setCategory(v); setPage(1); }}
                status={status}
                onStatusChange={(v) => { setStatus(v); setPage(1); }}
                categories={categories}
            />

            <ProductList
                products={products}
                loading={loading}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onRefresh={refetch}
            />

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-xl"
                    >
                        <ChevronLeft className="size-4"/>
                    </Button>
                    <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums px-3">
                        {page} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-xl"
                    >
                        <ChevronRight className="size-4"/>
                    </Button>
                </div>
            )}

            <ProductFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={editingProduct}
                categories={categories}
                onSuccess={refetch}
            />
        </div>
    );
}
