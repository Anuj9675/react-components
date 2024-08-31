// frontend/types/dataTableTypes.ts

export interface DataRow {
    id: number;
    name: string;
    age: number;
    city: string;
    date: string;
    time: string;
  }
  
  export interface DataTableHeaderProps {
    filterTextName: string;
    filterTextAge: string;
    filterTextCity: string;
    filterTextDate: string;
    filterTextTime: string;
    sortColumn: string | null;
    sortDirection: 'asc' | 'desc';
    onFilterChangeName: (text: string) => void;
    onFilterChangeAge: (text: string) => void;
    onFilterChangeCity: (text: string) => void;
    onFilterChangeDate: (text: string) => void;
    onFilterChangeTime: (text: string) => void;
    onSortChange: (column: string) => void;
    columns: string[];
  }
  
  export interface DataTableProps {
    data: DataRow[];
  }
  