import type React from "react"
export interface DataRow {
  id: number
  name: string
  age: string | number
  city: string
  date: string
  time: string
}

export interface DataTableProps {
  data: DataRow[]
}

export interface DataTableHeaderProps {
  filterTextName: string
  filterTextAge: string
  filterTextCity: string
  filterTextDate: string
  filterTextTime: string
  sortColumn: string | null
  sortDirection: "asc" | "desc"
  onFilterChangeName: (value: string) => void
  onFilterChangeAge: (value: string) => void
  onFilterChangeCity: (value: string) => void
  onFilterChangeDate: (value: string) => void
  onFilterChangeTime: (value: string) => void
  onSortChange: (column: string) => void
  columns: string[]
  onAddClick: () => void
  alert?: {
    type: "success" | "error"
    message: string
  };
   viewMode: "table" | "card";
  onViewModeChange: (mode: "table" | "card") => void;
}

export interface CardProps {
  children: React.ReactNode
  className?: string
}
