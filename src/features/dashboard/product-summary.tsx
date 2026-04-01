"use client";

import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import type {Product} from "@/shared/types";

interface ProductSummaryProps {
    products: Pick<Product, "_id" | "name" | "quantity" | "minimumStockThreshold" | "status">[];
}

export function ProductSummary({products}: ProductSummaryProps) {
    return (
        <Card className="p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Low Stock Products</h3>
            {products.length === 0 ? (
                <p className="text-sm text-gray-500">All products are well-stocked.</p>
            ) : (
                <div className="space-y-3">
                    {products.map((product) => {
                        const isOutOfStock = product.quantity === 0;
                        const isLow = product.quantity <= product.minimumStockThreshold;
                        return (
                            <div
                                key={product._id}
                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Threshold: {product.minimumStockThreshold}
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
                                                : isLow
                                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                                    : "bg-green-100 text-green-800 border-green-200"
                                        }
                                    >
                                        {isOutOfStock ? "Out of Stock" : isLow ? "Low Stock" : "OK"}
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
