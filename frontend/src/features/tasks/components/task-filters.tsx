"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TaskFilters } from "../types/task";

interface TaskFiltersBarProps {
    filters: TaskFilters;
    onFiltersChange: (filters: TaskFilters) => void;
}

export function TaskFiltersBar({ filters, onFiltersChange }: TaskFiltersBarProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                    placeholder="Search tasks..."
                    className="pl-8"
                    value={filters.search ?? ""}
                    onChange={(e) => onFiltersChange({ ...filters, search: e.target.value || undefined })}
                />
            </div>

            <Select
                value={filters.status ?? "all"}
                onValueChange={(value) =>
                    onFiltersChange({ ...filters, status: value === "all" ? undefined : (value as TaskFilters["status"]) })
                }
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Todo">To Do</SelectItem>
                    <SelectItem value="InProgress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.priority ?? "all"}
                onValueChange={(value) =>
                    onFiltersChange({ ...filters, priority: value === "all" ? undefined : (value as TaskFilters["priority"]) })
                }
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All priorities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}