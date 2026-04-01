"use client";

import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {orderStatuses} from "@/helpers/constant";

interface OrderFiltersProps {
    status: string;
    onStatusChange: (value: string) => void;
    startDate: string;
    onStartDateChange: (value: string) => void;
    endDate: string;
    onEndDateChange: (value: string) => void;
}

export function OrderFilters({
                                 status, onStatusChange,
                                 startDate, onStartDateChange,
                                 endDate, onEndDateChange,
                             }: OrderFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="All Statuses"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {orderStatuses.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full sm:w-44"
            />
            <Input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full sm:w-44"
            />
        </div>
    );
}
