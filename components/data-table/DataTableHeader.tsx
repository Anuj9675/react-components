"use client";

import type React from "react";
import { useState } from "react";
import { AlertTriangle, CheckCircle, Plus, Search, Table2, LayoutGrid } from "lucide-react";
import { DataTableHeaderProps } from "@/types/dataTableTypes";

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  filterTextName,
  filterTextAge,
  filterTextCity,
  filterTextDate,
  filterTextTime,
  sortColumn,
  sortDirection,
  onFilterChangeName,
  onFilterChangeAge,
  onFilterChangeCity,
  onFilterChangeDate,
  onFilterChangeTime,
  onSortChange,
  columns,
  onAddClick,
  alert,
  viewMode,
  onViewModeChange
}) => {
  const [filterName, setFilterName] = useState(filterTextName);
  const [filterAge, setFilterAge] = useState(filterTextAge);
  const [filterCity, setFilterCity] = useState(filterTextCity);
  const [filterDate, setFilterDate] = useState(filterTextDate);
  const [filterTime, setFilterTime] = useState(filterTextTime);

  const handleFilterChange = (column: string, value: string) => {
    switch (column) {
      case "name":
        setFilterName(value);
        onFilterChangeName(value);
        break;
      case "age":
        setFilterAge(value);
        onFilterChangeAge(value);
        break;
      case "city":
        setFilterCity(value);
        onFilterChangeCity(value);
        break;
      case "date":
        setFilterDate(value);
        onFilterChangeDate(value);
        break;
      case "time":
        setFilterTime(value);
        onFilterChangeTime(value);
        break;
    }
  };

  const getFilterValue = (column: string) => {
    switch (column) {
      case "name":
        return filterName;
      case "age":
        return filterAge;
      case "city":
        return filterCity;
      case "date":
        return filterDate;
      case "time":
        return filterTime;
      default:
        return "";
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white rounded-t-xl shadow-md">
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Search className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Search & Filter</h3>
            <p className="text-xs text-gray-500">Use filters to refine your data view.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {columns.filter((col) => col !== "id").map((col) => (
            <div key={col} className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 capitalize">{col}</label>
              <input
                type="text"
                placeholder={`Search ${col}`}
                value={getFilterValue(col)}
                onChange={(e) => handleFilterChange(col, e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white">
        <h2 className="text-lg font-bold text-gray-900">Data Management</h2>

        {/* Success/Error Message */}
          {alert && (
            <div
              className={`text-sm px-3 py-2 rounded font-medium flex items-center gap-2 transition-all duration-300 transform ${
                alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {alert.type === "success" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span>{alert.message}</span>
            </div>
          )}

        <div className="flex items-center gap-3">
          {/* View Toggle Buttons - Only visible on desktop */}
          <div className="hidden md:flex items-center gap-1">
             <button
              onClick={() => onViewModeChange("card")}
              className={`p-2 rounded border text-black ${viewMode === "card" ? "bg-gray-200" : ""}`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`p-2 rounded border text-black ${viewMode === "table" ? "bg-gray-200" : ""}`}
              title="Table View"
            >
              <Table2 className="w-4 h-4" />
            </button>
           
          </div>

          

          {/* Add New Record */}
          <button
            onClick={onAddClick}
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold rounded-md hover:from-blue-700 hover:to-blue-800 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 shadow hover:shadow-md transform hover:-translate-y-0.5"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add New Record
          </button>
        </div>
      </div>
    </div>
  );
};
