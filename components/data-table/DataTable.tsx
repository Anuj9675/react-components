'use client';
import React, { useState, useEffect } from 'react';
import { DataTableHeader } from './DataTableHeader';
import { DataRow, DataTableProps } from '@/types/dataTableTypes';

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [filterTextName, setFilterTextName] = useState<string>('');
  const [filterTextAge, setFilterTextAge] = useState<string>('');
  const [filterTextCity, setFilterTextCity] = useState<string>('');
  const [filterTextDate, setFilterTextDate] = useState<string>('');
  const [filterTextTime, setFilterTextTime] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const columns = ['id', 'name', 'age', 'city', 'date', 'time'];

  const handleSortChange = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filterData = (row: DataRow) => {
    return (
      (row.name.toLowerCase().includes(filterTextName.toLowerCase()) || !filterTextName) &&
      (row.age.toString().includes(filterTextAge) || !filterTextAge) &&
      (row.city.toLowerCase().includes(filterTextCity.toLowerCase()) || !filterTextCity) &&
      (row.date.toLowerCase().includes(filterTextDate.toLowerCase()) || !filterTextDate) &&
      (row.time.toLowerCase().includes(filterTextTime.toLowerCase()) || !filterTextTime)
    );
  };

  const filteredData = data.filter(filterData);

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn === null) return 0;
    const aValue = a[sortColumn as keyof DataRow];
    const bValue = b[sortColumn as keyof DataRow];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortColumn === 'time') {
        const [aTime, aPeriod] = aValue.split(' ') as [string, string];
        const [bTime, bPeriod] = bValue.split(' ') as [string, string];
        const aTimeMinutes = convertTimeToMinutes(aTime, aPeriod);
        const bTimeMinutes = convertTimeToMinutes(bTime, bPeriod);
        return (aTimeMinutes - bTimeMinutes) * (sortDirection === 'asc' ? 1 : -1);
      }

      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        return (aDate.getTime() - bDate.getTime()) * (sortDirection === 'asc' ? 1 : -1);
      }
      return (aValue < bValue ? -1 : 1) * (sortDirection === 'asc' ? 1 : -1);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * (sortDirection === 'asc' ? 1 : -1);
    }

    return 0;
  });

  const convertTimeToMinutes = (time: string, period: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours % 12) * 60 + minutes + (period === 'PM' ? 720 : 0);
    return totalMinutes;
  };

  return (
    <div className=" bg-gray-50">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-full sm:max-w-4xl md:max-w-6xl border border-gray-300 rounded shadow-lg bg-white">
          <div className="h-screen flex flex-col">
            <div className="flex-shrink-0">
              <DataTableHeader
                filterTextName={filterTextName}
                filterTextAge={filterTextAge}
                filterTextCity={filterTextCity}
                filterTextDate={filterTextDate}
                filterTextTime={filterTextTime}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onFilterChangeName={setFilterTextName}
                onFilterChangeAge={setFilterTextAge}
                onFilterChangeCity={setFilterTextCity}
                onFilterChangeDate={setFilterTextDate}
                onFilterChangeTime={setFilterTextTime}
                onSortChange={handleSortChange}
                columns={columns}
              />
            </div>
            <div className="flex-grow overflow-auto">
              <table className="w-full min-w-full table-fixed border-t shadow border-gray-300 text-xs sm:text-sm md:text-base">
                <tbody>
                  {sortedData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      {columns.map((column, index) => (
                        <td
                          key={column}
                          className={`p-4 border-b text-left ${index === 0 ? 'w-1/6' : 'w-1/6'}`}
                        >
                          {row[column as keyof DataRow]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
