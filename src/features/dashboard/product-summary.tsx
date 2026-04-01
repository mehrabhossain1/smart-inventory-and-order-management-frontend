"use client";

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
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-5">Product Stock Summary</h3>
            {products.length === 0 ? (
                <p className="text-sm text-slate-400">No products found.</p>
            ) : (
                <div className="space-y-1">
                    {products.map((product, i) => {
                        const isLowStock = product.stockLevel === "Low Stock";
                        const isOutOfStock = product.quantity === 0;
                        return (
                            <div
                                key={i}
                                className="flex items-center justify-between py-3 px-3 -mx-3 rounded-xl hover:bg-slate-50/80 transition-colors duration-200"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{product.name}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Threshold: {product.threshold}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span className="text-sm font-semibold text-slate-600 tabular-nums">
                                        {product.quantity}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-[11px] font-medium rounded-full px-2.5",
                                            isOutOfStock
                                                ? "bg-red-50 text-red-600 border-red-200"
                                                : isLowStock
                                                    ? "bg-amber-50 text-amber-600 border-amber-200"
                                                    : "bg-emerald-50 text-emerald-600 border-emerald-200"
                                        )}
                                    >
                                        {isOutOfStock ? "Out of Stock" : product.stockLevel}
                                    </Badge>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(" ");
}
