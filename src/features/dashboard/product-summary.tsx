"use client";

import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface ProductSummaryItem {
    name: string;
    quantity: number;
    threshold: number;
    status: string;
    stockLevel: string;
}

interface ProductSummaryProps {
    products: ProductSummaryItem[];
}

export function ProductSummary({products}: ProductSummaryProps) {
    return (
        <Card className="p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Product Stock Summary</h3>
            {products.length === 0 ? (
                <p className="text-sm text-gray-500">No products found.</p>
            ) : (
                <div className="space-y-3">
                    {products.map((product, i) => {
                        const isLowStock = product.stockLevel === "Low Stock";
                        const isOutOfStock = product.quantity === 0;
                        return (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Threshold: {product.threshold}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-700">
                                        {product.quantity} left
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={
                                            isOutOfStock
                                                ? "bg-red-100 text-red-800 border-red-200"
                                                : isLowStock
                                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                                    : "bg-green-100 text-green-800 border-green-200"
                                        }
                                    >
                                        {isOutOfStock ? "Out of Stock" : product.stockLevel}
                                    </Badge>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Card>
    );
}
