"use client";

import {useState, useEffect} from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {Category, Product} from "@/shared/types";
import {toast} from "sonner";

interface ProductFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: Product | null;
    categories: Category[];
    onSuccess: () => void;
}

export function ProductFormDialog({open, onOpenChange, product, categories, onSuccess}: ProductFormDialogProps) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        minimumStockThreshold: "5",
    });
    const [loading, setLoading] = useState(false);
    const isEdit = !!product;

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: typeof product.category === "object" ? product.category._id : product.category,
                price: String(product.price),
                quantity: String(product.quantity),
                minimumStockThreshold: String(product.minimumStockThreshold),
            });
        } else {
            setFormData({name: "", category: "", price: "", quantity: "", minimumStockThreshold: "5"});
        }
    }, [product, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const body = {
                name: formData.name.trim(),
                category: formData.category,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                minimumStockThreshold: Number(formData.minimumStockThreshold),
            };

            if (isEdit && product) {
                await apiClient.put(API_ENDPOINTS.products.byId(product._id), body);
                toast.success("Product updated successfully");
            } else {
                await apiClient.post(API_ENDPOINTS.products.list, body);
                toast.success("Product created successfully");
            }
            onOpenChange(false);
            onSuccess();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input
                            placeholder="e.g. iPhone 15"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                            <Label>Price ($)</Label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={formData.quantity}
                                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Min Threshold</Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="5"
                                value={formData.minimumStockThreshold}
                                onChange={(e) => setFormData({...formData, minimumStockThreshold: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary-light hover:bg-primary-light/90">
                            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
