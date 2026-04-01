"use client";

import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Search} from "lucide-react";
import type {Category} from "@/shared/types";

interface ProductFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    categories: Category[];
}

export function ProductFilters({
                                   search, onSearchChange,
                                   category, onCategoryChange,
                                   status, onStatusChange,
                                   categories,
                               }: ProductFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"/>
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Select value={category} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="All Categories"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
