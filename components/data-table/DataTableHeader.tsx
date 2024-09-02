'use client';
import React from 'react';
import { DataTableHeaderProps } from '@/types/dataTableTypes';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

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
  const handleSortClick = (column: string, direction: 'asc' | 'desc') => {
    onSortChange(column);
  };

  const getSortClassName = (column: string, direction: 'asc' | 'desc') => {
    if (sortColumn === column) {
      return direction === sortDirection ? 'text-blue-700' : 'text-blue-500';
    }
    return 'text-blue-500';
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
      <div className="p-2 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search Name"
            value={filterTextName}
            onChange={(e) => onFilterChangeName(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
          <input
            type="text"
            placeholder="Search Age"
            value={filterTextAge}
            onChange={(e) => onFilterChangeAge(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32"
          />
          <input
            type="text"
            placeholder="Search City"
            value={filterTextCity}
            onChange={(e) => onFilterChangeCity(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32 ml-2" // Adjust margin-left here
          />
          <input
            type="text"
            placeholder="Search Date"
            value={filterTextDate}
            onChange={(e) => onFilterChangeDate(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32 ml-2" // Adjust margin-left here
          />
          <input
            type="text"
            placeholder="Search Time"
            value={filterTextTime}
            onChange={(e) => onFilterChangeTime(e.target.value)}
            className="border border-gray-300 rounded p-1 text-xs sm:text-sm md:text-base w-32 ml-2" // Adjust margin-left here
          />
        </div>
      </div>
      <div className="bg-gray-100 border-t border-gray-300">
        <div className="p-2 md:p-4 flex flex-row text-xs sm:text-sm md:text-base">
          {columns.map((column, index) => (
            <div
              key={column}
              className={`flex p-2 text-left font-semibold cursor-pointer ${index === 0 ? 'w-1/6' : 'w-1/6'}`}
            >
              <div className="flex items-center">
                <span className="mr-2">{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                <div className="flex flex-col items-center -space-y-3"> 
                  <FaSortUp
                    className={`hover:opacity-80 cursor-pointer ${getSortClassName(column, 'asc')}`}
                    onClick={() => handleSortClick(column, 'asc')}
                  />
                  <FaSortDown
                    className={`hover:opacity-80 cursor-pointer ${getSortClassName(column, 'desc')}`}
                    onClick={() => handleSortClick(column, 'desc')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
