"use client";

import type React from "react";
import { useState } from "react";
import { AlertTriangle, CheckCircle, Plus, Search } from "lucide-react";
import { DataTableHeaderProps } from "@/types/dataTableTypes";

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
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
}) => {
  const [filterTextName, setFilterTextName] = useState<string>("");
  const [filterTextAge, setFilterTextAge] = useState<string>("");
  const [filterTextCity, setFilterTextCity] = useState<string>("");
  const [filterTextDate, setFilterTextDate] = useState<string>("");
  const [filterTextTime, setFilterTextTime] = useState<string>("");

  const handleFilterChange = (column: string, value: string) => {
    switch (column) {
      case "name":
        setFilterTextName(value);
        onFilterChangeName(value);
        break;
      case "age":
        setFilterTextAge(value);
        onFilterChangeAge(value);
        break;
      case "city":
        setFilterTextCity(value);
        onFilterChangeCity(value);
        break;
      case "date":
        setFilterTextDate(value);
        onFilterChangeDate(value);
        break;
      case "time":
        setFilterTextTime(value);
        onFilterChangeTime(value);
        break;
      default:
        break;
    }
  };

  const getFilterValue = (column: string) => {
    switch (column) {
      case "name":
        return filterTextName;
      case "age":
        return filterTextAge;
      case "city":
        return filterTextCity;
      case "date":
        return filterTextDate;
      case "time":
        return filterTextTime;
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
            <h3 className="text-base font-semibold text-gray-800">
              Search & Filter
            </h3>
            <p className="text-xs text-gray-500">
              Use filters to refine your data view.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {columns
            .filter((col) => col !== "id")
            .map((column) => (
              <div key={column} className="space-y-1">
                <label className="block text-xs font-medium text-gray-700 capitalize">
                  {column}
                </label>
                <input
                  type="text"
                  placeholder={`Search ${
                    column.charAt(0).toUpperCase() + column.slice(1)
                  }`}
                  value={getFilterValue(column)}
                  onChange={(e) => handleFilterChange(column, e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white">
        <h2 className="text-lg font-bold text-gray-900">Data Management</h2>
        {alert && (
          <div
            className={`text-sm px-3 py-2 rounded font-medium flex items-center gap-2 transition-all duration-300 transform ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } ${
              alert ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
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

        <button
          onClick={onAddClick}
          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold rounded-md hover:from-blue-700 hover:to-blue-800 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 shadow hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add New Record
        </button>
      </div>
    </div>
  );
};
