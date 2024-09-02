'use client';
import React, { useState } from 'react';
import { DataTableHeaderProps } from '@/types/dataTableTypes';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { MdLibraryAdd } from "react-icons/md";

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
}) => {
  const [filterTextName, setFilterTextName] = useState<string>('');
  const [filterTextAge, setFilterTextAge] = useState<string>('');
  const [filterTextCity, setFilterTextCity] = useState<string>('');
  const [filterTextDate, setFilterTextDate] = useState<string>('');
  const [filterTextTime, setFilterTextTime] = useState<string>('');

  const handleSortClick = (column: string, direction: 'asc' | 'desc') => {
    onSortChange(column);
  };

  const getSortClassName = (column: string, direction: 'asc' | 'desc') => {
    if (sortColumn === column) {
      return direction === sortDirection ? 'text-blue-700' : 'text-blue-500';
    }
    return 'text-blue-500';
  };

  const handleFilterChange = (column: string, value: string) => {
    switch (column) {
      case 'Name':
        setFilterTextName(value);
        onFilterChangeName(value);
        break;
      case 'Age':
        setFilterTextAge(value);
        onFilterChangeAge(value);
        break;
      case 'City':
        setFilterTextCity(value);
        onFilterChangeCity(value);
        break;
      case 'Date':
        setFilterTextDate(value);
        onFilterChangeDate(value);
        break;
      case 'Time':
        setFilterTextTime(value);
        onFilterChangeTime(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
      <div className="p-4 flex flex-col md:flex-row items-end md:items-center justify-end space-y-4 md:space-y-0">
        <div className="flex flex-row w-full gap-4">
          <input
            type="text"
            placeholder="Search Name"
            value={filterTextName}
            onChange={(e) => handleFilterChange('Name', e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-sm w-full md:w-32"
          />
          <input
            type="text"
            placeholder="Search Age"
            value={filterTextAge}
            onChange={(e) => handleFilterChange('Age', e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-sm w-full md:w-32"
          />
          <input
            type="text"
            placeholder="Search City"
            value={filterTextCity}
            onChange={(e) => handleFilterChange('City', e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-sm w-full md:w-32"
          />
          <input
            type="text"
            placeholder="Search Date"
            value={filterTextDate}
            onChange={(e) => handleFilterChange('Date', e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-sm w-full md:w-32"
          />
          <input
            type="text"
            placeholder="Search Time"
            value={filterTextTime}
            onChange={(e) => handleFilterChange('Time', e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-sm w-full md:w-32"
          />
        </div>
      </div>
      <div className='flex justify-end items-center p-2 border border-gray-300'>
        <div className="flex space-x-4">
          <button
            onClick={onAddClick}
            className="bg-green-500 text-white flex items-center space-x-2 p-1 rounded"
          >
            <MdLibraryAdd className='text-sm ' />
            <span className='text-sm'>Add</span>
          </button>
        </div>
      </div>
      <div className="bg-gray-100 border-t border-gray-300">
        <div className="py-2 px-4 border-b text-left flex flex-row w-full min-w-full table-fixed text-xs sm:text-sm md:text-base">
          {columns.map((column, index) => (
            <div
              key={column}
              className={`flex text-left font-medium cursor-pointer ${index === 0 ? 'w-1/6' : 'w-1/6'}`}
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
          <p className="py-2 px-4 font-semibold text-left w-1/6">Actions</p>
        </div>
      </div>
    </div>
  );
};
