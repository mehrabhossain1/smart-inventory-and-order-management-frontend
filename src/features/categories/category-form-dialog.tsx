"use client";

import {useState, useEffect} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {Category} from "@/shared/types";
import {toast} from "sonner";

interface CategoryFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
    onSuccess: () => void;
}

export function CategoryFormDialog({open, onOpenChange, category, onSuccess}: CategoryFormDialogProps) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const isEdit = !!category;

    useEffect(() => {
        if (category) {
            setName(category.name);
        } else {
            setName("");
        }
    }, [category, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            if (isEdit && category) {
                await apiClient.put(API_ENDPOINTS.categories.byId(category._id), {name: name.trim()});
                toast.success("Category updated successfully");
            } else {
                await apiClient.post(API_ENDPOINTS.categories.list, {name: name.trim()});
                toast.success("Category created successfully");
            }
            onOpenChange(false);
            onSuccess();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to save category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                            id="category-name"
                            placeholder="e.g. Electronics, Grocery, Clothing"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}
                                className="bg-primary-light hover:bg-primary-light/90">
                            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
