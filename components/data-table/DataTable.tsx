"use client";

import { useEffect, useState } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { Edit2, Save, X, Trash2, GripVertical } from "lucide-react";
import type { DataRow } from "@/types/dataTableTypes";
import { Card, CardContent } from "./card";
import { useTableData, useSaveTableData } from "@/hooks/useData";

export const DataTable = () => {
  const { data } = useTableData();
  const { save } = useSaveTableData();

  const [rows, setRows] = useState<DataRow[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [filterTextName, setFilterTextName] = useState("");
  const [filterTextAge, setFilterTextAge] = useState("");
  const [filterTextCity, setFilterTextCity] = useState("");
  const [filterTextDate, setFilterTextDate] = useState("");
  const [filterTextTime, setFilterTextTime] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<DataRow | null>(null);
  const [alert, setAlert] = useState<
    { message: string; type: "success" | "error" } | undefined
  >(undefined);
  const [draggedRowId, setDraggedRowId] = useState<number | null>(null);
  const [dragOverRowId, setDragOverRowId] = useState<number | null>(null);

  const columns = ["id", "name", "age", "city", "date", "time"];

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    setViewMode("card");
  }, []);

  const showAlert = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(undefined), 3000);
  };

  const handleSortChange = (column: string) => {
    if (column.startsWith("-")) {
      setSortColumn(column.slice(1));
      setSortDirection("desc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleAddClick = () => {
    const newRowData: DataRow = {
      id: rows.length + 1,
      name: "",
      age: "",
      city: "",
      date: "",
      time: "",
    };
    setNewRow(newRowData);
    setEditingRowId(newRowData.id);
  };

  const handleEditClick = (rowId: number) => {
    setEditingRowId(rowId);
    const rowToEdit = rows.find((row) => row.id === rowId);
    if (rowToEdit) setNewRow({ ...rowToEdit });
  };

  const handleEditSaveClick = () => {
    if (editingRowId !== null && newRow) {
      const existingIndex = rows.findIndex((r) => r.id === newRow.id);
      const updatedRows =
        existingIndex >= 0
          ? rows.map((r, i) => (i === existingIndex ? newRow : r))
          : [newRow, ...rows];
      const resequenced = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      setRows(resequenced);
      save(resequenced);
      setEditingRowId(null);
      setNewRow(null);
      showAlert(
        existingIndex >= 0
          ? "Record updated successfully!"
          : "New record added."
      );
    }
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
    setNewRow(null);
  };

  const handleDeleteClick = (rowId: number) => {
    const updated = rows.filter((row) => row.id !== rowId);
    const resequenced = updated.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setRows(resequenced);
    save(resequenced);
    if (editingRowId === rowId) {
      setEditingRowId(null);
      setNewRow(null);
    }
    showAlert("Record deleted successfully.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (newRow) {
      setNewRow((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleDragStart = (e: React.DragEvent, rowId: number) => {
    setDraggedRowId(rowId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const handleDragOver = (e: React.DragEvent, rowId: number) => {
    e.preventDefault();
    setDragOverRowId(rowId);
  };

  const handleDrop = (e: React.DragEvent, dropRowId: number) => {
    e.preventDefault();
    if (draggedRowId === null || draggedRowId === dropRowId) return;
    const draggedIndex = rows.findIndex((row) => row.id === draggedRowId);
    const dropIndex = rows.findIndex((row) => row.id === dropRowId);
    const updated = [...rows];
    const [draggedRow] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, draggedRow);
    const resequenced = updated.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setRows(resequenced);
    save(resequenced);
    setDraggedRowId(null);
    setDragOverRowId(null);
  };

  const filterData = (row: DataRow) => {
    const time = row.time.toLowerCase().trim();
    const filterTime = filterTextTime.toLowerCase().trim();
    const matchTime = () => {
      if (!filterTime) return true;
      const [filterPart, filterMeridian] = filterTime.split(" ");
      const hasMeridian = filterMeridian === "am" || filterMeridian === "pm";
      return hasMeridian
        ? time.includes(filterPart) && time.includes(filterMeridian)
        : time.includes(filterPart);
    };
    return (
      (row.name.toLowerCase().includes(filterTextName.toLowerCase()) ||
        !filterTextName) &&
      (row.age.toString().includes(filterTextAge) || !filterTextAge) &&
      (row.city.toLowerCase().includes(filterTextCity.toLowerCase()) ||
        !filterTextCity) &&
      (row.date.toLowerCase().includes(filterTextDate.toLowerCase()) ||
        !filterTextDate) &&
      matchTime()
    );
  };

  const filteredData = rows.filter(filterData);
  const sortedData = [...filteredData];

  if (sortColumn) {
    sortedData.sort((a, b) => {
      const valA = a[sortColumn as keyof DataRow] || "";
      const valB = b[sortColumn as keyof DataRow] || "";
      const result = valA.toString().localeCompare(valB.toString(), undefined, {
        numeric: true,
        sensitivity: "base",
      });
      return sortDirection === "asc" ? result : -result;
    });
  }

  if (newRow && !rows.find((r) => r.id === newRow.id))
    sortedData.unshift(newRow);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="sticky top-0 z-20 bg-white shadow">
        <DataTableHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
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
          onAddClick={handleAddClick}
          alert={alert}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full">
          {viewMode === "card" && (
            <Card className="shadow-2xl border-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {sortedData.map((row) => (
                  <div
                    key={row.id}
                    draggable={editingRowId !== row.id}
                    onDragStart={(e) => handleDragStart(e, row.id)}
                    onDragOver={(e) => handleDragOver(e, row.id)}
                    onDrop={(e) => handleDrop(e, row.id)}
                    className="cursor-move"
                  >
                    <Card className="transition-none">
                      <CardContent className="space-y-3 p-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              #{row.id.toString().padStart(3, "0")}
                            </span>
                          <div className="flex gap-2">
                            {editingRowId === row.id ? (
                              <>
                                <button
                                  onClick={handleEditSaveClick}
                                  className="text-green-600"
                                >
                                  <Save className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={handleCancelClick}
                                  className="text-gray-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditClick(row.id)}
                                  className="text-blue-600"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(row.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        {columns.slice(1).map((col) => (
                          <div
                            key={col}
                            className="flex justify-between text-sm items-center"
                          >
                            <span className="text-gray-600 capitalize">
                              {col}
                            </span>
                            {editingRowId === row.id ? (
                              <input
                                name={col}
                                value={newRow?.[col as keyof DataRow] || ""}
                                onChange={handleChange}
                                className="ml-4 text-right border px-2 py-1 rounded w-1/2 text-sm"
                              />
                            ) : (
                              <span className="font-medium text-gray-900">
                                {row[col as keyof DataRow]}
                              </span>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {viewMode === "table" && (
            <Card className="shadow-2xl border-0 ">
              <div className=" overflow-auto w-full">
                <div className="min-w-[768px] w-full overflow-x-auto">
                  <div className="sticky top-0 z-10 grid grid-cols-8 py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-700 shadow">
                    <div className="text-center">Drag</div>
                    {columns.map((col) => (
                      <div
                        key={col}
                        className="text-center cursor-pointer"
                        onClick={() => handleSortChange(col)}
                      >
                        {col.toUpperCase()}
                      </div>
                    ))}
                    <div className="text-center">Actions</div>
                  </div>
                  {sortedData.map((row) => (
                    <div
                      key={row.id}
                      draggable={editingRowId !== row.id}
                      onDragStart={(e) => handleDragStart(e, row.id)}
                      onDragOver={(e) => handleDragOver(e, row.id)}
                      onDrop={(e) => handleDrop(e, row.id)}
                      className="grid grid-cols-8 py-2 px-4 border-b bg-white"
                    >
                      <div className="flex justify-center items-center">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </div>
                      {columns.map((col) => (
                        <div
                          key={col}
                          className="flex justify-center items-center text-sm"
                        >
                          {editingRowId === row.id &&
                          newRow?.id === row.id &&
                          col !== "id" ? (
                            <input
                              name={col}
                              value={newRow[col as keyof DataRow]}
                              onChange={handleChange}
                              className="w-full px-2 py-1 text-xs border text-center"
                            />
                          ) : col === "id" ? (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              #{row.id.toString().padStart(3, "0")}
                            </span>
                          ) : (
                            <span>{row[col as keyof DataRow]}</span>
                          )}
                        </div>
                      ))}
                      <div className="flex justify-center items-center gap-1">
                        {editingRowId === row.id ? (
                          <>
                            <button
                              onClick={handleEditSaveClick}
                              className="p-1 bg-green-600 text-white rounded"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={handleCancelClick}
                              className="p-1 bg-gray-600 text-white rounded"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(row.id)}
                              className="p-1 bg-blue-600 text-white rounded"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(row.id)}
                              className="p-1 bg-red-600 text-white rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
