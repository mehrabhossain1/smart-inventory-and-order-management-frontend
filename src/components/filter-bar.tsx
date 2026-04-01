"use client"

import * as React from "react"
import { Search, MapPin, Briefcase, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterDropdownConfig {
  id: string
  label: string
  icon: React.ReactNode
  options: FilterOption[]
  placeholder?: string
}

export interface SalaryRangeConfig {
  min: number
  max: number
  step?: number
  formatValue?: (value: number) => string
}

export interface FilterBarProps {
  filters: FilterDropdownConfig[]
  salaryRange?: SalaryRangeConfig
  onFilterChange?: (filterId: string, value: string) => void
  onSalaryChange?: (range: [number, number]) => void
  className?: string
  defaultSalaryRange?: [number, number]
  filterValues?: Record<string, string>
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function FilterDropdown({
  config,
  value,
  onChange,
}: {
  config: FilterDropdownConfig
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-10 gap-2 rounded-full border-zinc-300 bg-white px-4 text-zinc-900",
          "hover:bg-zinc-50 focus:ring-0 focus:ring-offset-0",
          "data-[placeholder]:text-zinc-600"
        )}
      >
        <span className="flex items-center gap-2">
          <span className="text-zinc-500">{config.icon}</span>
          <SelectValue placeholder={config.placeholder || config.label} />
        </span>
      </SelectTrigger>
      <SelectContent className="border-zinc-200 bg-white text-zinc-900">
        {config.options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="focus:bg-zinc-100 focus:text-zinc-900"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function SalaryRangeFilter({
  config,
  value,
  onChange,
}: {
  config: SalaryRangeConfig
  value: [number, number]
  onChange?: (range: [number, number]) => void
}) {
  const formatValue = config.formatValue || formatCurrency

  return (
    <div className="flex items-center gap-4 pl-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500">Salary range</span>
        <span className="text-sm font-medium text-zinc-900">
          {formatValue(value[0])} - {formatValue(value[1])}
        </span>
      </div>
      <div className="w-32">
        <Slider
          value={value}
          min={config.min}
          max={config.max}
          step={config.step || 100}
          onValueChange={(newValue) => onChange?.(newValue as [number, number])}
          className="[&_[data-slot=slider-range]]:bg-cyan-500 [&_[data-slot=slider-thumb]]:border-cyan-500 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-track]]:bg-zinc-300"
        />
      </div>
    </div>
  )
}

export function FilterBar({
  filters,
  salaryRange,
  onFilterChange,
  onSalaryChange,
  className,
  defaultSalaryRange,
  filterValues = {},
}: FilterBarProps) {
  const [salaryValue, setSalaryValue] = React.useState<[number, number]>(
    defaultSalaryRange || [salaryRange?.min || 0, salaryRange?.max || 100000]
  )

  const handleSalaryChange = (range: [number, number]) => {
    setSalaryValue(range)
    onSalaryChange?.(range)
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl bg-white p-3 shadow-sm",
        className
      )}
    >
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.id}
          config={filter}
          value={filterValues[filter.id]}
          onChange={(value) => onFilterChange?.(filter.id, value)}
        />
      ))}
      {salaryRange && (
        <>
          <div className="mx-2 h-6 w-px bg-zinc-200" />
          <SalaryRangeFilter
            config={salaryRange}
            value={salaryValue}
            onChange={handleSalaryChange}
          />
        </>
      )}
    </div>
  )
}

// Default configuration matching the screenshot
export const defaultFilterConfig: FilterDropdownConfig[] = [
  {
    id: "role",
    label: "Designer",
    icon: <Search className="size-4" />,
    placeholder: "Designer",
    options: [
      { value: "designer", label: "Designer" },
      { value: "developer", label: "Developer" },
      { value: "manager", label: "Manager" },
      { value: "analyst", label: "Analyst" },
    ],
  },
  {
    id: "location",
    label: "Work location",
    icon: <MapPin className="size-4" />,
    placeholder: "Work location",
    options: [
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="size-4" />,
    placeholder: "Experience",
    options: [
      { value: "entry", label: "Entry Level" },
      { value: "mid", label: "Mid Level" },
      { value: "senior", label: "Senior Level" },
      { value: "lead", label: "Lead / Principal" },
    ],
  },
  {
    id: "period",
    label: "Per month",
    icon: <Calendar className="size-4" />,
    placeholder: "Per month",
    options: [
      { value: "month", label: "Per month" },
      { value: "year", label: "Per year" },
      { value: "hour", label: "Per hour" },
    ],
  },
]

export const defaultSalaryConfig: SalaryRangeConfig = {
  min: 1200,
  max: 20000,
  step: 100,
}
