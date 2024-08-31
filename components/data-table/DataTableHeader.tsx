'use client';
import React from 'react';
import { DataTableHeaderProps } from '@/types/dataTableTypes';

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
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
      <div className="p-2 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by Name"
            value={filterTextName}
            onChange={(e) => onFilterChangeName(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
          <input
            type="text"
            placeholder="Search by Age"
            value={filterTextAge}
            onChange={(e) => onFilterChangeAge(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
          <input
            type="text"
            placeholder="Search by City"
            value={filterTextCity}
            onChange={(e) => onFilterChangeCity(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
          <input
            type="text"
            placeholder="Search by Date"
            value={filterTextDate}
            onChange={(e) => onFilterChangeDate(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
          <input
            type="text"
            placeholder="Search by Time"
            value={filterTextTime}
            onChange={(e) => onFilterChangeTime(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
        </div>
        <div className="flex flex-row mt-2 gap-2">
          <button
            onClick={() => onSortChange('date')}
            className={`p-1 border rounded text-xs sm:text-sm md:text-base ${sortColumn === 'date' ? 'bg-gray-200' : 'bg-white'}`}
          >
            Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => onSortChange('time')}
            className={`p-1 border rounded text-xs sm:text-sm md:text-base ${sortColumn === 'time' ? 'bg-gray-200' : 'bg-white'}`}
          >
            Time {sortColumn === 'time' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      <div className="bg-gray-100 border-t border-gray-300">
        <div className="p-2 md:p-4 flex flex-row">
          {columns.map((column, index) => (
            <div key={column} className={`flex-1 p-2 text-left font-semibold ${index === 0 ? 'w-1/6' : 'w-1/6'}`}>
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
