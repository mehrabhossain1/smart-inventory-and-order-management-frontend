"use client";

import {useState, useEffect} from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Plus, Trash2, AlertCircle} from "lucide-react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {Product} from "@/shared/types";
import {formatCurrency} from "@/helpers";
import {toast} from "sonner";

interface OrderLine {
    productId: string;
    quantity: number;
}

interface CreateOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function CreateOrderDialog({open, onOpenChange, onSuccess}: CreateOrderDialogProps) {
    const [customerName, setCustomerName] = useState("");
    const [lines, setLines] = useState<OrderLine[]>([{productId: "", quantity: 1}]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            apiClient
                .get<{ products: Product[] }>(API_ENDPOINTS.products.list, {limit: 200})
                .then((data) => setProducts(data.products || []))
                .catch(console.error);
            setCustomerName("");
            setLines([{productId: "", quantity: 1}]);
        }
    }, [open]);

    const addLine = () => {
        setLines([...lines, {productId: "", quantity: 1}]);
    };

    const removeLine = (index: number) => {
        if (lines.length > 1) {
            setLines(lines.filter((_, i) => i !== index));
        }
    };

    const updateLine = (index: number, field: keyof OrderLine, value: string | number) => {
        const updated = [...lines];
        updated[index] = {...updated[index], [field]: value};
        setLines(updated);
    };

    const selectedProductIds = lines.map((l) => l.productId).filter(Boolean);

    const getProduct = (id: string) => products.find((p) => p._id === id);

    const totalPrice = lines.reduce((sum, line) => {
        const product = getProduct(line.productId);
        return sum + (product ? product.price * line.quantity : 0);
    }, 0);

    const getLineWarnings = (line: OrderLine): string[] => {
        const warnings: string[] = [];
        const product = getProduct(line.productId);
        if (!product) return warnings;

        if (product.status === "Out of Stock") {
            warnings.push("This product is currently unavailable.");
        } else if (line.quantity > product.quantity) {
            warnings.push(`Only ${product.quantity} items available in stock.`);
        }

        const duplicateCount = lines.filter((l) => l.productId === line.productId).length;
        if (duplicateCount > 1) {
            warnings.push("This product is already added to the order.");
        }

        return warnings;
    };

    const hasErrors = lines.some((line) => {
        if (!line.productId) return true;
        const warnings = getLineWarnings(line);
        return warnings.length > 0;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (hasErrors || !customerName.trim()) return;

        setLoading(true);
        try {
            const orderProducts = lines
                .filter((line) => line.productId)
                .map((line) => ({
                    product: line.productId,
                    quantity: Math.max(1, Math.floor(line.quantity)),
                }));

            await apiClient.post(API_ENDPOINTS.orders.list, {
                customerName: customerName.trim(),
                products: orderProducts,
            });

            toast.success("Order created successfully");
            onOpenChange(false);
            onSuccess();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to create order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Order</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Customer Name</Label>
                        <Input
                            placeholder="e.g. John Doe"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Products</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addLine}>
                                <Plus className="size-4 mr-1"/>
                                Add Item
                            </Button>
                        </div>

                        {lines.map((line, index) => {
                            const product = getProduct(line.productId);
                            const warnings = getLineWarnings(line);
                            const availableProducts = products.filter(
                                (p) => !selectedProductIds.includes(p._id) || p._id === line.productId
                            );

                            return (
                                <div key={index} className="space-y-2 p-3 border dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800/50">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1 space-y-2">
                                            <Select
                                                value={line.productId}
                                                onValueChange={(v) => updateLine(index, "productId", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select product"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableProducts.map((p) => (
                                                        <SelectItem key={p._id} value={p._id}>
                                                            {p.name} — {formatCurrency(p.price)} ({p.quantity} in stock)
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max={product?.quantity || 9999}
                                                    value={line.quantity}
                                                    onChange={(e) => updateLine(index, "quantity", Number(e.target.value))}
                                                    className="w-24"
                                                    placeholder="Qty"
                                                />
                                                {product && (
                                                    <span className="text-sm text-gray-500 dark:text-slate-400">
                                                        &times; {formatCurrency(product.price)} = {formatCurrency(product.price * line.quantity)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {lines.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeLine(index)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
                                            >
                                                <Trash2 className="size-4"/>
                                            </Button>
                                        )}
                                    </div>

                                    {warnings.map((warning, wi) => (
                                        <div key={wi} className="flex items-center gap-1.5 text-xs text-amber-600">
                                            <AlertCircle className="size-3.5 shrink-0"/>
                                            {warning}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between border-t dark:border-slate-700 pt-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Total</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-slate-100">{formatCurrency(totalPrice)}</span>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || hasErrors || !customerName.trim()}
                            className="bg-primary-light hover:bg-primary-light/90"
                        >
                            {loading ? "Creating..." : "Create Order"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
