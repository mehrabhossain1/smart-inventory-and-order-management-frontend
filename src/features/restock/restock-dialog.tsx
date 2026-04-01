"use client";

import {useState} from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {RestockQueueItem} from "@/shared/types";
import {toast} from "sonner";

interface RestockDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: RestockQueueItem | null;
    onSuccess: () => void;
}

export function RestockDialog({open, onOpenChange, item, onSuccess}: RestockDialogProps) {
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!item || !quantity) return;

        setLoading(true);
        try {
            await apiClient.post(API_ENDPOINTS.restock.restock(item.product._id), {
                quantity: Number(quantity),
            });
            toast.success(`Restocked ${item.product.name} with ${quantity} units`);
            setQuantity("");
            onOpenChange(false);
            onSuccess();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to restock");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Restock Product</DialogTitle>
                </DialogHeader>
                {item && (
                    <div className="text-sm text-gray-500 mb-2">
                        <p><span className="font-medium text-gray-900">{item.product.name}</span></p>
                        <p>Current stock: {item.currentStock} | Threshold: {item.threshold}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Quantity to Add</Label>
                        <Input
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary-light hover:bg-primary-light/90">
                            {loading ? "Restocking..." : "Restock"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
