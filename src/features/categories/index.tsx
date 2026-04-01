"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useAuthStore} from "@/store/auth-store";
import {useCategories} from "./use-categories";
import {CategoryList} from "./category-list";
import {CategoryFormDialog} from "./category-form-dialog";
import type {Category} from "@/shared/types";

export default function CategoriesPage() {
    const {categories, loading, refetch} = useCategories();
    const {user} = useAuthStore();
    const isAdmin = user?.role === "admin";

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setDialogOpen(true);
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400 dark:text-slate-500">{categories.length} categories</p>
                </div>
                {isAdmin && (
                    <Button onClick={handleAdd} className="bg-primary-light hover:bg-primary-light/90 shadow-sm shadow-primary-light/20 rounded-xl">
                        <Plus className="size-4 mr-2"/>
                        Add Category
                    </Button>
                )}
            </div>

            <CategoryList
                categories={categories}
                loading={loading}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onRefresh={refetch}
            />

            <CategoryFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                category={editingCategory}
                onSuccess={refetch}
            />
        </div>
    );
}
