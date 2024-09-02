'use client';
import React, { useState } from 'react';
import { DataTableHeaderProps } from '@/types/dataTableTypes';
import { FaSortUp, FaSortDown, FaTrash, FaPen, FaPlus } from 'react-icons/fa';
import { GrPowerReset } from "react-icons/gr";

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
  onEditClick,
  onDeleteClick,
  onAddClick,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>('');

  const handleSortClick = (column: string, direction: 'asc' | 'desc') => {
    onSortChange(column);
  };

  const getSortClassName = (column: string, direction: 'asc' | 'desc') => {
    if (sortColumn === column) {
      return direction === sortDirection ? 'text-blue-700' : 'text-blue-500';
    }
    return 'text-blue-500';
  };

  const handleFilterChange = (value: string) => {
    setFilterText(value);
    if (selectedFilter === 'Name') onFilterChangeName(value);
    else if (selectedFilter === 'Age') onFilterChangeAge(value);
    else if (selectedFilter === 'City') onFilterChangeCity(value);
    else if (selectedFilter === 'Date') onFilterChangeDate(value);
    else if (selectedFilter === 'Time') onFilterChangeTime(value);
  };

  const resetFilter = () => {
    setSelectedFilter(null);
    setFilterText('');
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-300"> 
    
      <div className="p-4 flex flex-col md:flex-row items-end md:items-center justify-end space-y-4 md:space-y-0">
      
        <div className="flex flex-wrap gap-4">
          {selectedFilter ? (
            <>
              <input
                type="text"
                placeholder={`Search ${selectedFilter}`}
                value={filterText}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-md w-40"
              />
              <button
                onClick={resetFilter}
                className="flex items-center justify-center border w-10 h-10 border-gray-300 rounded-full text-base  bg-red-500 text-white"
              >
                <GrPowerReset/>
              </button>
            </>
          ) : (
            <select
              onChange={(e) => setSelectedFilter(e.target.value)}
              value={selectedFilter || ''}
              className="border border-gray-300 rounded p-2 text-sm sm:text-base md:text-md w-40"
            >
              <option value="" disabled>
                Select Filter
              </option>
              <option value="Name">Name</option>
              <option value="Age">Age</option>
              <option value="City">City</option>
              <option value="Date">Date</option>
              <option value="Time">Time</option>
            </select>
          )}
        </div>
        
      </div>
      <div className=' flex justify-end items-center p-4 border border-gray-300'>
      <div className="flex space-x-4 ">
          <button
            onClick={onDeleteClick}
            className="flex items-center space-x-2"
          >
            <FaTrash className='bg-red-500 text-white p-0.5 text-sm sm:text-base md:text-md' />
            <span className='text-sm sm:text-base md:text-md'>Delete</span>
          </button>
          <button
            onClick={onAddClick}
            className=" text-black flex items-center space-x-2 "
          >
            <FaPlus className='bg-green-500 text-white p-0.5 text-sm sm:text-base md:text-md'/>
            <span className='text-sm sm:text-base md:text-md'>Add</span>
          </button>
        </div>
      </div>
      <div className="bg-gray-100 border-t border-gray-300">
        <div className="py-2 px-4 border-b text-left flex flex-row w-full min-w-full table-fixed text-xs sm:text-sm md:text-base">
          {columns.map((column, index) => (
            <div
              key={column}
              className={`flex text-left font-semibold cursor-pointer ${index === 0 ? 'w-1/6' : 'w-1/6'}`}
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
